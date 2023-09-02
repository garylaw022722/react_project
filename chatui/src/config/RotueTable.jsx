import React from 'react'
import{ BrowserRouter as Router , Routes , Route} from 'react-router-dom'
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
            </Routes>
        </Router>

     
    </div>
  )
}

export default RotueTable
