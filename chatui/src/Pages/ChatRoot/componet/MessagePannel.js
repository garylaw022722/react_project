import React  ,{useEffect, useRef, useState} from 'react'
import './css/MessagePannel.css'
import MessageSenderLayout from './MessageSenderLayout'
import {Row ,Col } from 'react-bootstrap'
import MessageReceiveLayout from './MessageReceiveLayout'
import { useDispatch, useSelector } from 'react-redux'
import { updateMessageQueue } from '../../../features/Messages'
import {format } from 'date-fns'
import SendBtn from './SendBtn'
import { QueryCache, useQueryClient } from '@tanstack/react-query'

const MessagePannel = ({socket,cur_user }) => {

    const ref_Bottom =useRef(null);
    
    const {chatId} =  useSelector(state=> state.msgSlice.MessageHeader);
    // #message receive lisitener
    console.log(chatId)
    
    const client = useQueryClient();


    const [msgQueue, setMsgQueue]= useState([]);
    // console.log("Catch obtain",result)

    socket.on("message", (payload)=>{
        console.log("payload gotted",payload)
        setMsgQueue([...msgQueue , payload] )
        // ref_Bottom?.current?.scrollIntoView({ 
        //         behavior: 'instant', 
        //         block: "end",
        //         inline: "nearest",
        //     });
        // const element = document.getElementsByClassName("mainContentChat")
        // element.scrollTop = element.scrollHeight;
      })

     
    

  return (
    <React.Fragment>
        <div className='pannelBound' >
            <div className='mainContentChat'>
                    <Row>
                        {

                            msgQueue.map(({sender,sendTo , sumited_at ,message} ,index)=>{
                              if(cur_user===sendTo){
                                  return (<MessageReceiveLayout content={message} date={sumited_at} sender={sender} key={index}  />)
                              
                                }else if(cur_user=== sender){
                                    return <MessageSenderLayout content={message}  date={sumited_at}  key={index}/>
                                }

                            })
                        } 
                    <div ref={ref_Bottom}></div>
                    </Row>
                </div>
        </div>
        <SendBtn socket={socket} msgQueue={msgQueue} setMsgQueue={setMsgQueue} ref_Bottom={ref_Bottom} />
    </React.Fragment>
  )
}

export default MessagePannel
