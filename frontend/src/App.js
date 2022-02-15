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
      <div>
        <ul>
          <li>
            <Link to="/">Deck</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
      </div>
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
      <div>Deck</div>

      {cards.map((element) => (
        <img key={element[1].id} src={element[1].img}></img>
      ))
      }
    </div>
  )
}

const Search = () => (
  <div>
    <h1>Search</h1>
  </div>
)

export default App;
