const {io} =require("socket.io-client");
const socket =  io("http://127.0.0.1:4085/ChatServer");
    

  socket.on("core", (...args)=>{
      console.log(args)

  })

  socket.emit("joint_Room","cs50")
  socket.emit("joint_Room","cs5020")
  socket.emit("Read_Socket")
  socket.emit("Logined" ,"garylaw@gmail.com");

  socket.emit("message",{
    sendToGroup :"s,as,",
    message:"12k2"
  })  


  console.log(false|| false)