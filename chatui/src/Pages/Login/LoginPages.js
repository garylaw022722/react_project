import React ,{useState}from 'react'
import {login_Api} from '../../api/getData'
import {useQuery , useMutation , useQueryClient} from '@tanstack/react-query'
import {Row, Col , Form , FormGroup , FormControl ,FormLabel, Container, Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup' 
import * as Yup from 'yup'
import './Login.css'

import { Link } from 'react-router-dom'
import {useDispatch ,useSelector} from 'react-redux'
import userProfile, {createProfile} from '../../features/userProfile'
import  { useNavigate } from 'react-router-dom'
 
const LoginPages = () => {
  const queryClient = useQueryClient();
  const nav =useNavigate();
  const [isSuccessLogin, setLoginFail] = useState(true);
    
  const  formSchema = Yup.object().shape({
    email: Yup.string()
    .required("Email address is required !"),
    
    password: Yup.string()
    .max(process.env.REACT_APP_PASSWORD_LENGTH ,process.env.REACT_APP_PASSWORD_LENGTH_Execption_MSG)
    
  })
  const {register , handleSubmit  ,formState:{errors}} = useForm({resolver: yupResolver(formSchema)})
  
  const dispatch = useDispatch()
 
  const submit =async(formData)=>
  {
    
    const res  =await login_Api(formData);
    console.log("called")
    
    let profile = {
      username: formData.email,
      access_Token : res.access_Token
    }
    if(res?.access_Token) {
      dispatch(createProfile(profile))
      nav("/chatRoom");
    }else{
      console.log("login fail")
      setLoginFail(false);
    }
  }
 
  


                                

  return (
    <Container className='LoginContainer h-100' fluid={true}>
        <Row  style={{height:'100vh'}}>
          <Col className='emptySpace' xs={8}></Col>
          <Col className='p-4 '>
              <Form>
                <legend>Login</legend>
                <FormGroup className='mb-4'>
                  <FormLabel>Username</FormLabel>
                  <FormControl 
                    type='text'
                    {...register("email")}
                  />
                  <Form.Text>{errors.email?.message}</Form.Text>
                </FormGroup>
                <FormGroup className='mb-4'> 
                  <FormLabel>Password</FormLabel>
                  <FormControl 
                    type='password'
                    {...register("password")}
                    />
                    <Form.Text>{errors.password?.message}</Form.Text>
                </FormGroup>
                <FormGroup hidden={isSuccessLogin}><FormLabel>email or password is not correct </FormLabel></FormGroup>
              </Form>
                <Button 
                      style={{backgroundColor:"rgb(59, 72, 117)" , border:'none'}}
                      className="w-100 btnLogin p-2 card-subtitle-1" 
                      onClick={handleSubmit(submit)}>Sign in</Button>
                <Link to="/Registration" className='registeration_dir card-subtitle-1' > Register new Account</Link>
          </Col>
        </Row>
    </Container>
  )
}

export default LoginPages