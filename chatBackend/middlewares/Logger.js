const fs = require("fs"); 
const fs_Promise = fs.promises; 
const  {format} = require("date-fns")
const {v4:uuid}  =require("uuid");
const path =require("path");

const writeLog =async (msg) => {
    const logging_dir =path.join(__dirname , "..","Logging");
    console.log(logging_dir) 
    try{
        if(!fs.existsSync(logging_dir))
            await fs_Promise.mkdir(logging_dir);
        await fs_Promise.appendFile(path.join(logging_dir ,"log.txt") , msg);

    }catch(error){
        console.log(error)
    }

} 

const logging = (req,res,next)=>{
    let dateTime = format(new Date() , "dd-MM-yyy hh:mm:ss");
    let msg =`${uuid()}\t${dateTime}\t${req.method}\t\t${req.url}\n`
    writeLog(msg);
    next();
}
module.exports ={logging};