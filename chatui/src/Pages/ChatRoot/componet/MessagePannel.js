import React  ,{useEffect, useRef, useState} from 'react'
import './css/MessagePannel.css'
import MessageSenderLayout from './MessageSenderLayout'
import {Row ,Col } from 'react-bootstrap'
import MessageReceiveLayout from './MessageReceiveLayout'
import { useDispatch, useSelector } from 'react-redux'
import { setMessageQueue, updateMessageQueue } from '../../../features/Messages'
import {format } from 'date-fns'
import SendBtn from './SendBtn'
import { QueryCache, useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'

import axios from 'axios'

const MessagePannel = ({socket,cur_user }) => {

    
    const user =  useSelector(state=> state.user.profile);
    const {chatId} =  useSelector(state=> state.msgSlice.MessageHeader);
    const {messageQueue} = useSelector(state=> state.msgSlice);
    const chatKey =[process.env.REACT_APP_REACT_KEY_GET_MESSAGE , chatId];


    
    const ref_Bottom =useRef(null);
    const dispatch = useDispatch()    ;
    const client = useQueryClient();
    
    


    

    const getRecord =async(page)=>{
        try{          
            let url = `http://127.0.0.1:4085/nusrRoute/getMessageByToken?token=${chatId}&page=${page}`
             const data = await axios.post(url,{"token":chatId},{
                headers: { 
                        "Authorization" :user.access_Token , 
                },
            })
            console.log(data)
            return data
        }catch(err){
            console.log(err)
        }
        
    }
   
    const fetchPriviousData =(e)=>{
        console.log("fetching ....")
        const  clientHeight = e.target.clientHeight
        const  scrollTop = e.target.scrollTop
        const  scrollHeight = e.target.scrollHeight    
        console.log("clientHeight ",clientHeight)
        console.log("scrollTop ", scrollTop)
        console.log("scrollHeight ", scrollHeight)
        if (scrollTop <=  0){
            console.log("should fetch")
            if (scrollTop  <= scrollHeight * 0.2){
                fetchNextPage();
                e.target.scrollTop = scrollHeight ;

            }
        }
         
    }

    const {data ,isLoading ,isStale ,hasNextPage ,isRefetching,isFetched, fetchNextPage} = useInfiniteQuery(["getMessageBytoken", chatId ], async({pageParam=0})=>await getRecord(pageParam) ,{
        getNextPageParam: (lastPage, allPages) =>{
                return  allPages?.length +1 ;
        },
        keepPreviousData:false
    
    })
    
    let msgs =[];
    if (isFetched){
        
        const result =data?.pages?.flatMap(ele =>ele.data)
        console.log("result " ,result) 
        msgs =result?.reverse();
        ref_Bottom?.current?.scrollIntoView();
    }

    useEffect( ()=>{
        dispatch(setMessageQueue(msgs));
 
    },[isFetched])


    useEffect(()=>{

        socket.on("message", (data)=>{
            client.invalidateQueries([process.env.REACT_APP_REACT_KEY_GET_MESSAGE])
            client.invalidateQueries([process.env.REACT_APP_REACT_KEY_GET_CONTACT_LIST])

            const  date = new Date(data.sumited_at);
            data.sumited_at= format(date,process.env.REACT_APP_DATE_FORMAT)

            dispatch(updateMessageQueue(data));

        })
    },[])





  return (
    <React.Fragment>
        <div className='pannelBound' >
            <div className='mainContentChat'  onScroll={(e)=>fetchPriviousData(e)}  >
                    <Row >
                        {
                            messageQueue?.map(({sender,sendTo , sumited_at ,message} ,index)=>{
                                

                              if(cur_user===sendTo){
                                  return (<MessageReceiveLayout content={message} date={sumited_at} sender={sender} key={index}  />)
                              
                                }else if(cur_user=== sender){
                                    return <MessageSenderLayout content={message}  date={sumited_at}  key={index}/>
                                }

                            })
                        } 
                    </Row>
                    <div ref={ref_Bottom} ><p hidden={true}> This is bottom</p></div>
                </div>
        </div>
        <SendBtn socket={socket}  ref_Bottom={ref_Bottom} chatKey={chatKey}/>
    </React.Fragment>
  )
}

export default MessagePannel
