import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  
  return (
  <div className="App">
    <Router>

    <ul>
      <li>
        <Link class="link" to="/">Deck</Link>
      </li>
      <li>
        <Link class="link" to="/search">Search</Link>
      </li>
    </ul>

      <Routes>
        <Route path="/" element={<Deck/>}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>
    </Router>
  </div>
  );
}

function Deck() {
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
    <div>
      <div class="heading">Deck</div>

      {cards.map((element) => (
        <img key={element[1].id} src={element[1].img}></img>
      ))
      }
    </div>
  )
}

const Search = () => (
  <div>
    <div class="heading">Search</div>
  </div>
)

export default App;
