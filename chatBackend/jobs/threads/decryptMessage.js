const {workerData, parentPort} =require("worker_threads");
const {decrypt}=require("../Decryption");

const run_jobs =async()=>{
    console.log("child Jobs is executed..............");
    console.log("Debug - payload obtained \n",workerData.msg);

    const decryptedMessage =await Promise.all(
            workerData.msg.map(async(ele) => {
                    ele.message = await decrypt(ele);
                    return ele;
            })
        )

    
    console.log("decryption Finish ...........\n" , decryptedMessage);
    parentPort.postMessage(decryptedMessage);
}


run_jobs();

