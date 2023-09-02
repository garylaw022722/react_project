import React, { useState } from 'react'
import ContactITEM from './ContactITEM'
import './css/shortList.css'
import {getContactList} from'../../../api/getData'
import { useQuery} from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import axios from 'axios'
const ShortList = ({setOuterQueue}) => {
  
  const profile = useSelector(state=>state.user.profile);

  const [contactList ,setContactList] = useState([]);
  const {data ,isLoading ,isFetched,error} =useQuery(["getContactList"] , ()=>{
      return axios.get( "http://127.0.0.1:4085/nusrRoute/getPrivateMessage",{
        headers :{
            Authorization :profile.access_Token
        }
    })
  })
  var items = [];
  if(isFetched && data?.data){
    
    items = data?.data.map(({participant, sources,privateRoom_Token},index)=>{
      
      const sender = participant.filter( usr => usr !== profile.username)
      const {message ,sumited_at ,sender:last_Msg_Sender} =  sources.slice(-1)[0]
       
      const msg=(last_Msg_Sender!== profile.username)?message:`You : ${message}`

      return <ContactITEM 
                    lastestMSG={msg} 
                    name={sender} 
                    dateTime={sumited_at} 
                    chatToken ={privateRoom_Token}
                    key={privateRoom_Token}  
                    setOuterQueue={setOuterQueue}
                    />
 

    })

  }
  

  return (
   
    <div className='contactList'>
      {
        items.map(e=>e)
      }
    </div>
  )
}

export default ShortList
