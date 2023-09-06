import { createSlice } from "@reduxjs/toolkit"
import Action from "../Pages/ChatRoot/componet/Action"
        
let MSG_initState ={
        MessageHeader :{
                sendTo : '',
                sender : '',
                chatId:''
        },
        messageQueue: [],
        senderStatus :'',
        openTheChat : false,
        createNewContect : false,
        newContactor :[]
        
    
}

const MessageSlice =  createSlice({
    name: "msgSlice", 
    initialState:MSG_initState,
    reducers:{
       updateSenderTarget:(state,Action)=>{
            state.MessageHeader =Action.payload;

       },

       updateMessageQueue :(state, Action)=>{

            state.messageQueue = [...state.messageQueue , Action.payload]
       },
       updateSenderStatus :(state,Action)=>{
                state.senderStatus = Action.payload;
       },
       updateOpenTheChat : (state, Action)=> {
                state.openTheChat = Action
       },
       setMessageQueue :(state , Action)=>{
        state.messageQueue = Action.payload;

       },
       createNewContectFn : (state, Action)=> {
        state.createNewContect = Action.payload
        },

        
        
    }
})
export const {createNewContectFn,setMessageQueue ,updateOpenTheChat ,updateSenderTarget , updateMessageQueue, updateSenderStatus} =MessageSlice.actions;

export default MessageSlice.reducer;
