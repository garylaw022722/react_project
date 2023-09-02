import React from 'react'
import {Stack,Container, Form , FormLabel, Button}from'react-bootstrap'
import {useForm} from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import {io} from 'socket.io-client'
import './Registration.css'


const Registration = () => {
    
    const formSchema= Yup.object().shape({
        email : Yup.string().max(20).required().email(),
        password : Yup.string().max(12).required(),
        rePassword : Yup.string().max(12).required("Comfirm Password is required")
        .oneOf([ Yup.ref("password")] ,"Please Enter the same password")
    })
    const  {register, handleSubmit ,formState:{errors} } = useForm({resolver: yupResolver(formSchema) });
    


    const submit =(data:any)=>{
        // socket.emit("Logined", data.email);


    }
  return (
    <Container className='LoginForm w-50 mt-5 p-4'>
        <Form>
            <legend className='mb-4'>User Registration Form</legend>
            <Form.Group className='mb-3'> 
                <FormLabel>Email</FormLabel>
                <Form.Control
                    type='text'
                    {...register("email")}
                />
                <Form.Text>{errors.email?.message}</Form.Text>
            </Form.Group>
            <Form.Group  className='mb-3'>
                <FormLabel>Password</FormLabel>
                <Form.Control
                    type='password'
                    {...register("password")}
                />
                <Form.Text>{errors.password?.message}</Form.Text>
            </Form.Group>
            <Form.Group className='mb-3'>
                <FormLabel>Comfirm Password</FormLabel>
                <Form.Control
                    type='password'
                    {...register("rePassword")}
                />
                <Form.Text>{errors.rePassword?.message}</Form.Text>
            </Form.Group>
            <Stack gap={3} className='mt-4 mb-4 pt-2'>
                <Button  id='btnSubmit' onClick={handleSubmit(submit)}>Submit</Button>
            </Stack>
        </Form>
    </Container>
  )
}


export default Registration;
