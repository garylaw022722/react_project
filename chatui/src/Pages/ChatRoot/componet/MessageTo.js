import React, { useState } from 'react'
import './css/MessageTo.css'
import { Row, Col ,Stack} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { updateSenderStatus } from '../../../features/Messages'
const MessageTo = ({socket}) => {

  const header = useSelector(state=>state.msgSlice.MessageHeader)
  const [status ,setStatus] = useState('');
  const [isTyping ,setTpying] =useState(false);
  
  
  socket.emit("onlineChecking",header);
  
  socket.on("typing", (res_isTyping)=>{
    console.log("isTpying ?" ,res_isTyping)
    setTpying(res_isTyping)

    isTyping ? setStatus("typing...") :setStatus("")
  })
  
  socket.on("onlineChecking" , (onlineStatus)=>{
    console.log("Your status is retrieved ", onlineStatus);
    console.log(status==="")
        !isTyping && setStatus(onlineStatus)

  })


  return (
    <div className='sendToBound'>
        <Row>
            <Col xs={1}>
                <div className='imageBox'></div>
            </Col>
            <Col>
            <Stack  direction="vertical" gap={1}>
                <div>{header.sendTo}</div>
                <div className='typing'>{status}</div>

            </Stack>
            </Col>
        </Row>
     
    </div>
  )
}

export default MessageTo
