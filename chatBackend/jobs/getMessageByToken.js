require("dotenv").config()
const privMSG = require("../model/PrivateMessage")
const {decrypt} = require("../jobs/Decryption");
const os = require("os");
const path = require("path");
const {Worker ,parentPort, workerData ,isMainThread }  =require("worker_threads");
let threadPool = [];


const createThread=(encrypted_MSGs)=>{
    return  new Promise ( (resolve ,reject)=>{
            const  child_JS = path.join(__dirname , "threads/decryptMessage.js")
            const thread = new Worker(child_JS ,{workerData:{ msg:encrypted_MSGs}});

            thread.on("message", (data)=>{
                console.log("child proccess return msg .......\n" ,data);
                resolve(
                    // JSON.parse(data)
                    data
                );   
            })

            thread.on("error", (err) => {
                //child data cannot return 
                reject(err)
              });
            
            thread.on("exit", (err) => {
                reject(err)
            });          
   
    })
}


const createWorker =(msgs,numJobs)=>{
    if (msgs.length == 0)return ;
    
    const msg = msgs.splice(0,numJobs);
    threadPool.push(createThread(msg));

    createWorker( msgs,numJobs);
}




const getMessageByToken = async (req,res,next)=>{

    try{
        if(isMainThread){
            console.log("grepping the message by id....")
            const {page} = req.query;
            const NUM_PAGE_ELE =Number (process.env.MESSAGGREP_PER_PAGE)
            const token = req.body.token;
            

            let log = await privMSG.aggregate( [
                {
                    $match : {"privateRoom_Token" :  token}
                },
                {
                    $project: {
                        _id : 0,
                        sources: { $reverseArray : "$sources"}
                    }
                },
                {$unwind : "$sources"}
            ])
            .skip(NUM_PAGE_ELE * page)
            .limit(NUM_PAGE_ELE)
            // console.log(log)
            
            log = log.map(ele=>ele.sources);
            const logL = 14;
            const cpuLength = os.cpus().length;
            const  numTread =(cpuLength > logL)? logL:  cpuLength;

            const eachJobs =  Math.ceil(logL / numTread);
            let overflow  =0;
            if (eachJobs * numTread >  logL){
                overflow = eachJobs * numTread % logL
            }
            
            console.info("cpu :",cpuLength)
            console.log("each job : ", eachJobs)
            console.log("number of thread : ", numTread);
            console.log("number of overflow : ", overflow);



            createWorker(log ,eachJobs);
            
            //collect  all of promise;
            let promisesData = await Promise.all(threadPool);
            promisesData = promisesData.flatMap(ele=>ele);
            
            console.log(promisesData);
            res.send(promisesData)        
            
            console.log("req body is ",req.body)
            

        }

    
    

        // log = await Promise.all(
        //      log.map(async(ele)=> {
        //         ele.sources.message = await decrypt(ele.sources);
        //         return ele.sources;
        //     })
        // )        
    }catch(Err){
        console.log(Err)
    }

}


module.exports ={getMessageByToken}