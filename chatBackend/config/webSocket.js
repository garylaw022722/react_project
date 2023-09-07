
const {Server} = require("socket.io");
const {sendMessage} = require("../jobs/sendMessages")
const {loadingMsg} = require("../jobs/loadingMsg");
const { emit } = require("../model/PrivateMessage");
const {checkSocket_USER_Exist} =require("../jobs/checkSocket_USR_Exist")
require("dotenv").config();
const connectWebSocket =(appServer)=>{
    
    const server = new Server(appServer ,{
        cors: {
            origin: "*"
        }
    });

    const  chatApp = server.of("/ChatServer");
    

    chatApp.on("connection", (socket)=>{
        console.log("websocker is created........");
        
        socket.on("onlineChecking" , async({sender ,sendTo})=>{

            try{
                console.log(`Online Checking : sender [${sender}] is checking for ${sendTo}`)
                const  sendTo_Socket = await checkSocket_USER_Exist(sendTo ,chatApp)
                const sender_Socket =  await checkSocket_USER_Exist(sender ,chatApp)
                const res1 =(sendTo_Socket===undefined)?"Offine":"Online"
                const res2 =(sender_Socket===undefined)?"Offine":"Online"
                console.log("recever ",sendTo,"is ",res1)
                console.log("sender ",sender,"is ",res2)
                socket.emit("onlineChecking",res1);                    

            }catch(er){
                console.log("typing error \n", er)
            }
        })

        socket.on("typing" , async({sender,sendTo  , isTyping}) =>{
            try{
                console.log(`sender [${sender}] is typing for ${sendTo}`)
                const  msgReceiver = await checkSocket_USER_Exist(sendTo ,chatApp)
                socket.to(msgReceiver?.socket_id).emit("typing",isTyping);                    
            }catch(er){
                console.log("typing error \n", er)
            }

        } )

        socket.on("jointPrivateRoom", ({room_id})=>{
            socket.join(room_id);
        })
        
        socket.on("Logined", async(username)=>{  
            try{
                console.log("debug---"+username)
                socket.userInfo = {
                    "username":username,
                    "socket_id" : socket.id,
                    "isLogined": socket.connected
                }   
                
                console.log(socket.userInfo)              
            }catch(err){
                console.log(err)
            }

        })

        socket.on("joint_Room", room=>{
            socket.join(room);
            console.log(socket.rooms)
        })
   

        socket.on("message" , sendMessage(chatApp, socket))
    })



    
    server.on("disconnect",  ()=>{
        server.emit("core","user has been leave");
        
    })

}

module.exports ={connectWebSocket}