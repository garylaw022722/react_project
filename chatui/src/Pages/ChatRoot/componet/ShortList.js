import React, { useEffect, useState } from 'react'
import ContactITEM from './ContactITEM'
import './css/shortList.css'
import {getContactList} from'../../../api/getData'
import { useQuery} from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { alignPropType } from 'react-bootstrap/esm/types'
import Search from './Search'
const ShortList = ({}) => {
  
  const profile = useSelector(state=>state.user.profile);
  const {searchKey} = useSelector(ele=>ele.msgSlice);

  const {data ,isLoading ,isFetched,error} =useQuery(["getContactList"] , ()=>{
      return axios.get( "http://127.0.0.1:4085/nusrRoute/getContactList",{
        headers :{
            Authorization :profile.access_Token
        }
    })
  } ,{
    // refetchInterval: 1000
  })
  var items = [];
  if(isFetched){
    console.log(`isFetched` ,isFetched)
    items = data?.data?.map(({participant, sources,privateRoom_Token},index)=>{
      
      const sender = participant.filter( usr => usr !== profile.username)
      if(sender[0].includes(searchKey) ||  searchKey===''){

        if(!sources[0])
            return  <ContactITEM  
                            name={sender}
                            chatToken ={privateRoom_Token}
                            key={privateRoom_Token}                          
                            dateTime={new Date()}  
                    />
  
      const {message ,sumited_at ,sender:last_Msg_Sender} =  sources[0];
       
      const msg=(last_Msg_Sender!== profile.username)?message:`You : ${message}`
  
  
      return <ContactITEM 
                    lastestMSG={msg} 
                    name={sender} 
                    dateTime={sumited_at} 
                    chatToken ={privateRoom_Token}
                    key={privateRoom_Token}  
                    />

      }


    })

    items?.sort((item1 ,item2) => {
      if(item2.props?.dateTime && item1.props?.dateTime)
        return  new Date(item2.props.dateTime) -  new Date(item1.props.dateTime) 
    })
  }



  return (
   <>
      <Search/>
      <div className='contactList'>
          {items?.map(ele=>ele)}
      </div>
   </>
    )
}

export default ShortList
