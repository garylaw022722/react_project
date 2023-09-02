import React from 'react'
import './css/MessageSenderLayout.css'
import {Row ,Col, Stack} from 'react-bootstrap'
const MessageSenderLayout = ({ content  ,date}) => {
  return (
      <Row className='mb-3 msgLayout_sender' >
        <Col ></Col>
        <Col  className="Sender_MainContent" >
            <div className='content'>{content}</div> 
            <div className='date'>{date}</div>
        </Col>
      </Row>

  )
}



export default MessageSenderLayout
