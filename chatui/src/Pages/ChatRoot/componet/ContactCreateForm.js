import React, { useState } from 'react'
import {Button, Form ,Stack} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {createNewContectFn} from '../../../features/Messages'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const ContactCreateForm = ({access_token ,setContactList}) => {
    const [contactUsr ,setContactUsr] = useState("")
    const [response ,setResponse] = useState("")

    const dispatch = useDispatch();

    
    const createNewContact = async(contactUser)=>{
      const res = await axios.post(
            `http://127.0.0.1:4085/nusrRoute/createContactUsr`,
            {
                contactUser: contactUser
            },
            {
                headers:{
                    Authorization: access_token
                }
            }
        
      )  
        return res.data;

      
    }
    
    const {mutate ,errors}= useMutation( async (contactUser)=>await createNewContact(contactUser),{
        onSuccess:({errorCode ,result})=>{
            if(result){
                setResponse(result)   

            }else{
                setResponse(errorCode)
            }
        },
        enabled  :contactUsr !==""
    })

   const call_API = ()=>{
        mutate(contactUsr)
   }


  return (
    <Form style={{padding:'20px'}}>
        <Form.Group className='mb-4'>
            <Form.Label>Contact users</Form.Label>
             <Form.Control                 
                type="text" 
                className='mt-2'
                value ={contactUsr}
                onChange={(e)=>setContactUsr(e.target.value)}
                placeholder='Enter the username'
             />
             <Form.Label className="w-100 mt-3" style={{fontSize: '15px' , textAlign:"center",color:"red"}}>{response}</Form.Label>
        </Form.Group>
        <Stack gap={4}  style={{margin:"auto"}}>
            <Button onClick={call_API}>Submit</Button>
            <Button onClick={()=>dispatch(createNewContectFn(false))}>Return to Contact List </Button>
        </Stack>

    </Form>
        
      
  )
}

export default ContactCreateForm
