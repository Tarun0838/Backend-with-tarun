import { useState } from 'react'
import axios from 'axios'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [userData, setUserData] = useState([]);

  // now backend se data mangte hai 
  useEffect(() => {
    axios.get('/api/userdata')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <>
      <h1>Tarun Yadav </h1>
      <p>connecting Backend with Frontend</p>

      <h2> userData : {userData.length} </h2>

      {
        userData.map((user, index) => (
          <div key={user.id} >
            <h1> {user.name} </h1>
            <h2> {user.skill} </h2>
          </div>
        ))
        
        
      }
    </>
  )
}

export default App
