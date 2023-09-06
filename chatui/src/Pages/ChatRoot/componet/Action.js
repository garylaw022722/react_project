import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Nav,Navbar , NavDropdown, Stack} from 'react-bootstrap';
import {createNewContectFn} from '../../../features/Messages'

const Action = ({username}) => {

  const dispatch = useDispatch()


  return (
    <Nav className="" style={{ height:"10vh",borderBottom:"3px solid #d1d1e0" ,}}>
      <Stack direction='horizontal' gap={2} style={{ width:"100%",margin:"15px"}}>
        <div className='w-75'> {username}</div>
        <NavDropdown title="Action" >
                <NavDropdown.Item  onClick={()=>dispatch(createNewContectFn(true))}>Create New Contact</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Logout</NavDropdown.Item>         
        </NavDropdown>
      </Stack>


    </Nav>
  )
}

export default Action