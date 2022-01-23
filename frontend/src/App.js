import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState("taco")

  useEffect(async () => {
    const fetchData = async () => {
      let result = await axios("/users");
      setUsers(result.data);
    };
    
    fetchData();
  }, [])
  
  return (
  <div className="App">
    <p>yes</p>
    {/* {users.map(user =>
      <div>{user.message}</div>)} */}
    <p>{users}</p>

  </div>
  );
}

export default App;
