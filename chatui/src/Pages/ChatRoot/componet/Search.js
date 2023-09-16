import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import {Button, Form, Stack} from 'react-bootstrap'
import { setSerachKeys } from '../../../features/Messages';
import { useDispatch } from 'react-redux';
const Search = () => {
  const [keywords, setKeywords] = useState("");
  const [color , backgroundColor] = useState("blue")

    const client = useQueryClient();
    const dispatch = useDispatch();

    const search =(e)=>{
      setKeywords(e.target.value);
      dispatch(setSerachKeys(e.target.value));
      
    }
  return (
    <Stack 
          gap={3} 
          direction='horizontal'
          style={{
            padding:"10px",
            borderBottom:"1px solid gan"
          }}
    >

      <Form.Control 
        type="text"
        value={keywords}
        onChange={(e)=> search(e)}
        placeholder='Enter the email address'
  
        />
        <Button className='btn bg-light text-info'
            style={{
              border:"none",
            }}
        >Search</Button>
      </Stack>

  )
}

export default Search
