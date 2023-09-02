const checkSocket_USER_Exist=async (target_usr , chatApp)=>{
    try{

        const sockets = await chatApp.fetchSockets();
        const  usr_Socket = sockets.map(usr => usr.userInfo)
                                    .find(e => e?.username === target_usr);
            console.log(usr_Socket)
        return usr_Socket;
    }catch(err){
        console.log(err)
    }
}

module.exports ={checkSocket_USER_Exist}