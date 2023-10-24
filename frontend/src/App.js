import React, { useState } from 'react';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Navigate from './Components/Navigate';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ChatArea from './Components/ChatArea';
import Sidebar from './Components/Sidebar';


function App() {
  const [selectedUserId, setSelectedUserId] = useState(null); 
  
  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <BrowserRouter>
      <Navigate />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/chat' element={
          <div className='chat-container'>
            <Sidebar onUserSelect={handleUserSelect} selectedUserId={selectedUserId} />
            <ChatArea selectedUserId={selectedUserId} />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
