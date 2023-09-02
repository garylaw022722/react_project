import React, { useState } from 'react'
import {Button, Form, Stack} from 'react-bootstrap'
const Search = () => {
  const [keywords, setKeywords] = useState("");
  const [color , backgroundColor] = useState("blue")
  const onhover= (e)=>{
    
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
        onChange={(e)=> setKeywords(e.target.value)}
        placeholder='Enter the email address'
        />
        <Button className='btn bg-light text-info'
            style={{
              border:"none",
            }}
          onMouseOver={onhover}
        >Search</Button>
      </Stack>

  )
}

export default Search
