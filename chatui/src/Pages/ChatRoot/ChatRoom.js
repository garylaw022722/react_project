import React, { useState } from 'react'
import {io} from 'socket.io-client'
import {useForm} from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Stack ,Row,Col} from 'react-bootstrap';
import Action from '../ChatRoot/componet/Action';
import Search from '../ChatRoot/componet/Search';
import ChatRecord from './componet/ShortList';
import ShortList from './componet/ShortList';
import MessageTo from './componet/MessageTo';
import MessagePannel from './componet/MessagePannel';
import SendBtn from './componet/SendBtn';
import { useDispatch, useSelector } from 'react-redux';
import { setUpSocket } from '../../features/userProfile';
const ChatRoom = () => {

  const [outerQueue , setOuterQueue] = useState([]);
  let socket =  io("http://127.0.0.1:4085/ChatServer");
  const {username} = useSelector(state => state.user.profile)


  // # map the user  to the socket
  socket.emit("Logined", username)

  socket.on("core", (...args)=>{
      console.log(args)
      socket.emit("jointRoom","ksksksks");
  })



  socket.on("ChatLog" ,data=>{
    console.log("GetChating Log......")
    console.log(data)
  })
  

  

  return (
    <React.Fragment>

    <Container fluid={true}  >
      <Row  style={{border:"1px solid red" ,height:"100vh"}}>
        <Col style={{border :"1px solid red" ,padding:'0'}} xs={3}> 
          <Stack>
            <Action username={username} socket={socket}/>
            <Search />
            <ShortList  setOuterQueue={setOuterQueue} />
          </Stack>
        </Col>
        <Col style={{padding:'0'}} xs={9}>
          <Stack>
              <MessageTo socket={socket}/>
              <MessagePannel socket={socket} cur_user={username} outerQueue={outerQueue}/></Stack>
        </Col>
      </Row>
    </Container>

    </React.Fragment>

    
  )
}

export default ChatRoom
