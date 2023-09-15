import React, { useState } from 'react'
import {Button, Form ,FormControl, Stack} from 'react-bootstrap'

import Axios  from 'axios'
import { useDispatch } from 'react-redux';
import {format} from 'date-fns'
import {updateMessageQueue,setMessageQueue} from '../../../features/Messages'
import {useSelector} from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { da } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
const SendBtn = ({socket ,msgQueue ,setMsgQueue ,ref_Bottom ,chatKey}) => {
    const [msg ,setMsg] = useState('');
    const client = useQueryClient()
    const dispatch= useDispatch()  
    const  senderInfo =  useSelector(state => state.msgSlice.MessageHeader)
    const  {access_Token} =  useSelector(state => state.user.profile)
    const  nav =useNavigate();
    
    const  updateChat = async(payload)=>{
        try{
            console.log(payload)
            await axios.post("http://127.0.0.1:4085/nusrRoute/backup" ,payload,{
                headers:{
                    Authorization : access_Token
                }
            })

            return  payload;
        }catch(err){
            console.log(err)
            return  "fail"
        }
    }
    
    
    const {mutate,} = useMutation(
            async(payload)=> await  updateChat( payload),
            {
                onSuccess :(data)=>{
                    console.log("data obtain" ,data);
                    client.invalidateQueries(chatKey)
                    client.invalidateQueries([process.env.REACT_APP_REACT_KEY_GET_CONTACT_LIST])
                    data.sumited_at= format(data.sumited_at ,process.env.REACT_APP_DATE_FORMAT)
                    dispatch(updateMessageQueue(data));
                }
            }
        )
    
        const sendMutation = ()=>{

        const sendDate =new Date();
        
        const payload = {...senderInfo ,message : msg,sumited_at: sendDate}
        
        socket.emit("message" , payload)
        mutate(payload)



        
        setMsg('')
        ref_Bottom?.current?.scrollIntoView({ behavior: 'smooth' });


        
    }



    
    const focusout=(e)=>{
        socket.emit("typing" ,{...senderInfo, isTyping:false})
    }
    const typing=(e)=>{
        console.log("I am typing")
        socket.emit("typing" ,{...senderInfo, isTyping:true})
        setMsg(e.target.value);


    }
    const SENDBTN_CSS = {
                        width: "0",
                        height: "0",
                        borderTop: "10px solid transparent",
                        borderBottom: "10px solid transparent",
                        borderLeft:"10px solid #f2f0f5",                       
        }
            
  return (
    <Stack direction='horizontal' gap={3} style={{padding:"10px"}}>

        <FormControl
            style={{backgroundColor:"rgba(198, 219, 227, 0.8) "}}
            type="text"
            placeholder='Enter your message here'
            value={msg}
            onChange={(e)=>typing(e)}
            onBlur={(e)=>focusout(e)}
            />
        <Button onClick={sendMutation}> 
            <div style={SENDBTN_CSS}></div>
        </Button>

        </Stack>
  )
}

export default SendBtn
