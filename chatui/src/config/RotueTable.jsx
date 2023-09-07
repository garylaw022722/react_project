import React from 'react'
import{ BrowserRouter as Router , Routes , Route ,Navigate} from 'react-router-dom'
import ChatRoom from '../Pages/ChatRoot/ChatRoom' 
import Registration from '../Pages/UserRegistration/Registration'
import LoginPages from '../Pages/Login/LoginPages'
const RotueTable = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/Registration' element={<Registration/>}/>
                <Route path='/chatRoom' element={<ChatRoom/>}/>
                <Route path='/Login' element={<LoginPages/>}/>
                <Route path='/' element={<Navigate to="/Login" />}/>
            </Routes>
        </Router>

     
    </div>
  )
}

export default RotueTable
