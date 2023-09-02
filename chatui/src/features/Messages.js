import { createSlice } from "@reduxjs/toolkit"
import Action from "../Pages/ChatRoot/componet/Action"

let MSG_initState ={
        MessageHeader :{
                sendTo : '',
                sender : '',
                chatId:''
        },
        messageQueue: []
        
    
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


       }
        
        
    }
})
export const {updateSenderTarget , updateMessageQueue} =MessageSlice.actions;

export default MessageSlice.reducer;
