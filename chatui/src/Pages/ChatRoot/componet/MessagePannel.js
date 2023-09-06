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

    const ref_Bottom =useRef(null);

    
    const {chatId} =  useSelector(state=> state.msgSlice.MessageHeader);
    const messageQueue =  useSelector(state=> state.msgSlice.messageQueue);
    const user =  useSelector(state=> state.user.profile);
    // #message receive lisitener
    console.log(chatId)
    
    const client = useQueryClient();

    const [msgQueue, setMsgQueue]= useState([]);

    

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

    const {isFetchingNextPage,data ,isLoading ,isStale ,hasNextPage ,isFetched, fetchNextPage} = useInfiniteQuery(["getMessageBytoken", chatId ], async({pageParam=0})=>await getRecord(pageParam) ,{
        getNextPageParam: (lastPage, allPages) =>{
                console.log("lastPAge" ,lastPage.data)
                console.log("allPAges" ,allPages.length)
                return  allPages.length +1 ;
        },
        enabled : chatId!=="",
        // refetchInterval: 1500,   
    })
    let msgs =[];

    if (isFetched){
        const result =data?.pages.flatMap(ele =>ele.data)
        console.log("result " ,result) 
        msgs =result?.reverse();
        data?.pages.length ==1 &&  ref_Bottom?.current?.scrollIntoView();
    }

   

  return (
    <React.Fragment>
        <div className='pannelBound' >
            <div className='mainContentChat'  onScroll={(e)=>fetchPriviousData(e)}  >
                    <Row >
                        <div style={{backgroundColor :'red'}} >ksaskaksa</div>
                        {
                            msgs?.map(({sender,sendTo , sumited_at ,message} ,index)=>{
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
        <SendBtn socket={socket} msgQueue={msgQueue} setMsgQueue={setMsgQueue} ref_Bottom={ref_Bottom} />
    </React.Fragment>
  )
}

export default MessagePannel
