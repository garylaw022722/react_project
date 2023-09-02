import React from 'react'
import { useSelector } from 'react-redux'
const Action = ({username}) => {

  return (
    <div style={{
      height:"10vh",
      borderBottom:"1px solid red"
    }}>
      <div>{username}</div>


    </div>

  )
}

export default Action