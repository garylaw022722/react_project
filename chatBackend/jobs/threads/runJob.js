const {Worker , workerData ,isMainThread ,parentPort} =require("worker_threads");
const numCPU = require("os").cpus().length;

const {connect} = require("../../config/dbConnection");
let thread_Pool = [];
const roomDB = require("../../model/Room")


const create_Jobs = ()=>{
    return new Promise ((resolve , reject)=>{
        const thread = new Worker(__filename)
        thread.on("error", (err) => {
            reject(err)
          });
        
        thread.on("exit", () => {
            reject()
        });          
        
        thread.on("message", (msg) => {
                resolve(
                    JSON.parse(msg)
                );            
          });

    })
}
connect()
const  child_task = async()=>{
    try{
        const data =await roomDB.find().select({_id:0}).exec()
        console.log(data)
        parentPort.postMessage(JSON.stringify(data));

    }catch(err){
        console.log(err);
    }
}
const  main = async ()=>{
    console.log(`The  main thread of  proccess id is ${process.pid}`)
    for(let k = 0 ; k < numCPU ; k++ ){
        thread_Pool.push(
            create_Jobs()
        );
    }
    const data = await Promise.all(thread_Pool); 
    console.log(data)
}

if(isMainThread){
    main();
    console.time();
}else{
    child_task();
}