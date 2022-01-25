import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [cards, setCards] = useState("taco")

  useEffect(() => {
    const fetchData = async () => {
      let result = await axios("/deck");
      setCards(result.data);
    };
    
    fetchData();
  }, [])
  
  return (
  <div className="App">
    <p>yes</p>
    {/* {users.map(user =>
      <div>{user.message}</div>)} */}
    <img src={cards[0].img}></img>

  </div>
  );
}

export default App;
