
const {Server} = require("socket.io");
const {sendMessage} = require("../jobs/sendMessages")
const {loadingMsg} = require("../jobs/loadingMsg");
const { emit } = require("../model/PrivateMessage");
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
        
    
        socket.on("Logined", async(username)=>{  
            try{
                console.log("debug---"+username)
                socket.userInfo = {
                    "username":username,
                    "socket_id" : socket.id,
                    "isLogined": socket.connected
                }   
                
                console.log(socket.userInfo)
                const chat_Logs=   await loadingMsg(username);
                console.log("Logs : loading login proccess=---------")                    
                console.log(chat_Logs)
                socket.emit("ChatLog", chat_Logs);
            }catch(err){
                console.log(err)
            }

        })

        socket.on("joint_Room", room=>{
            socket.join(room);
            console.log(socket.rooms)
        })
        
        socket.on("typing", (client) =>{

        })

        socket.on("message" , sendMessage(chatApp, socket))
    })



    
    server.on("disconnect",  ()=>{
        server.emit("core","user has been leave");
        
    })

}

module.exports ={connectWebSocket}