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
import  ContactCreateForm from './componet/ContactCreateForm'
const ChatRoom = () => {

  const [contactList ,setContactList] = useState([]);
  let socket =  io("http://127.0.0.1:4085/ChatServer");
  const {username ,access_Token} = useSelector(state => state.user.profile)
  const {openTheChat,createNewContect} = useSelector(state => state.msgSlice);


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
      <Row  style={{height:"100vh"}}>
        <Col style={{padding:'0'}} xs={3}> 
          <Stack>
            <Action username={username} socket={socket}/>
              {
                createNewContect ?
                <ContactCreateForm access_token={access_Token} />
                
                :<div>
                  <ShortList  setContactList={setContactList} contactList={contactList} />
                </div>
              }
         
          </Stack>
        </Col>
        <Col style={{padding:'0'}} xs={9}>
          
          <Stack hidden={!openTheChat}>
              <MessageTo socket={socket}/>
              <MessagePannel socket={socket} cur_user={username} />
          </Stack>
          <div  hidden={openTheChat}
                style={{
                        textAlign:"center" ,
                        paddingTop:"45vh",
                        backgroundColor:"#e9edef",
                        height :"100%"
                  }}>Select a contact user from the list</div>
        </Col>
      </Row>
    </Container>

    </React.Fragment>

    
  )
}

export default ChatRoom
