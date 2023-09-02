import React from 'react'
import './css/MessageReceiveLayout.css'
import { Col ,Row } from 'react-bootstrap'
const MessageReceiveLayout = ({ sender,content ,date}) => {
  return (
    <Col className='recevierQueue' xs={13}>
        <div className='msgLayout w-50 mb-3' xs={13}>
            <div className='sender mb-2'>{sender}</div> 
            <div className='content'>{content}</div>
            <div className='date'>{date}</div>
        </div>
    </Col>
      
  )
}

export default MessageReceiveLayout
