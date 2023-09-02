import React from 'react'
import './css/MessageTo.css'
import { Row, Col ,Stack} from 'react-bootstrap'
import { useSelector } from 'react-redux'
const MessageTo = () => {

  const sendTo = useSelector(state=>state.msgSlice.MessageHeader.sendTo)
  return (
    <div className='sendToBound'>
        <Row>
            <Col xs={1}>
                <div className='imageBox'></div>
            </Col>
            <Col>
            <Stack  direction="vertical" gap={1}>
                <div>{sendTo}</div>
                <div className='typing'>Typing...</div>

            </Stack>
            </Col>
        </Row>
     
    </div>
  )
}

export default MessageTo
