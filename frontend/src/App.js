import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [cards, setCards] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let result = await axios("/deck");
      let deck = result.data;
      deck = Object.entries(deck);
      console.log(deck);
      setCards(deck);
    };
    
    fetchData();
  }, [])
  
  return (
  <div className="App">
    <p>yes</p>

    {cards.map((element) => (
      <img key={element[1].id} src={element[1].img}></img>
    ))
    }

  </div>
  );
}

export default App;
