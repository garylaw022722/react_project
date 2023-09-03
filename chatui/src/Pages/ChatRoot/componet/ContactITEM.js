import React from 'react'
import { Row, Stack ,Col } from 'react-bootstrap'
import './css/contactITEM.css'
import {format} from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { updateOpenTheChat, updateSenderTarget } from '../../../features/Messages'
import { useQueryClient  } from '@tanstack/react-query'


const ContactITEM = ({icon ,name, lastestMSG ,dateTime , chatToken   ,setOuterQueue}) => {
  
  const dispatch = useDispatch()
  const username =  useSelector(state => state.user.profile.username)
  
  let date = format(new Date(dateTime) , "dd/MM/yyyy");

  
  
  const client =useQueryClient();
  const fetChatRecord=()=>{

      const data = {
            sendTo : name[0],
            sender : username,
            chatId:chatToken
        }

      console.log()
      // const result = client.getQueryData(["getContactList"])?.data                         
      //           .filter( (privateRoom)=> {
      //               return privateRoom.privateRoom_Token === chatToken
      //           })[0]["sources"]
      // setOuterQueue(result)
      // console.log("result data" , result)                
      
      
      dispatch(updateSenderTarget(data));
      dispatch(updateOpenTheChat(true));

      console.log("the queue is clear.......")
  } 
    


  return (
                  
    <Stack direction='horizontal' className="Contact_itemContainer" gap={3} onClick={fetChatRecord}>
        <div className="icon" ></div>
        <div className="details" style={{width:"80%"}}>
                <div className='itemDateTime'>{date}</div>
                <div className='name'>{name}</div>
                <div className='latestMSG w-8'>{lastestMSG}</div>
        </div>
    </Stack>
  )
}

export default ContactITEM
