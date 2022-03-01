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
        <img class="card" key={element[1].id} src={element[1].img}></img>
      ))
      }
    </div>
  )
}



const Search = () => {
  const initialFormData = Object.freeze({
    search: ""
  });

  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const searchCard = (e) => {
    // Prevent Refresh
    e.preventDefault();
     
    // delete previous search
    let previous = document.querySelectorAll('.search-container');
   
    previous.forEach((one) => {
      one.remove();
    })

    // execute new search and render each card image
    let string = "https://api.scryfall.com/cards/search?q=" + formData["search"]

    fetch(string)
      .then(res => res.json())
      .then(
        (result => {
          let cards = result["data"];
          
          if (cards){
            cards.forEach((one) => {
              let image = one.image_uris.normal;
              // console.log(image);
  
      
  
              // Card
              let card = document.createElement('img');
              card.src = image;
              card.className = "search-card";
  
              let button = document.createElement('button');
              button.className = "card-add";
              button.innerText = "add";
              
              let container = document.createElement('span');
              container.className = "search-container";
              
              container.appendChild(card);
              container.appendChild(button);
              document.querySelector('.App').append(container);
            })
          } else {
            alert("Couldn't find a card by that name!");
          }
          

        })
      )
  }

  return (
    <div>
      <div class="search-box">
        <div class="heading2">Search</div>
        <input class="search-input" type="text" placeholder="Wrath of God" name="search" onChange={handleChange}></input>
        <button class="search" onClick={searchCard}>Search</button>
      </div>
    </div>
  )
  
}


export default App;
