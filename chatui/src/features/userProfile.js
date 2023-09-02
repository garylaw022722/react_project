import {createSlice ,nanoid} from '@reduxjs/toolkit'
import Action from '../Pages/ChatRoot/componet/Action';

const initState = { 
    profile : {username:'/NA' , access_Token : ''} ,
    socket : {}
}

const  profileSlice = createSlice({
    name :"user",
    initialState:initState,
    reducers:{
        createProfile: (state ,Action)=>{
            state.profile = Action.payload;
        },
        setUpSocket :(state, Action)=>{
            state.socket = Action.payload  
        }
       
        
    }
})
export const {createProfile ,setUpSocket} =profileSlice.actions;

export default profileSlice.reducer;
