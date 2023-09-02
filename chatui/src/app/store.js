import { configureStore ,applyMiddleware } from '@reduxjs/toolkit'
import  profileReducer from '../features/userProfile'
import  messages from '../features/Messages'

export const store= configureStore({
    reducer:{
        user :  profileReducer,
        msgSlice:messages
    } 
})