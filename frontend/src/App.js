import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link, 
  useNavigate,
} from "react-router-dom";
import * as reactDOM from 'react-dom';
import ReactDOM from 'react-dom'
// import nfetch from 'node-fetch';

function App() {
  
  return (
  <div className="App">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <Router>

    <ul>
      <li>
        <Link class="link" to="/">Deck</Link>
      </li>
      <li>
        <Link class="link" to="/search" onClick={clearCards}>Search</Link>
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

const clearCards = () => {
  let previous = document.querySelectorAll('.search-container');
 
  previous.forEach((one) => {
    one.remove();
  })
}

const incrementDeck = (e) => {
  // console.log("increment");
  let num = e.target.parentNode.childNodes[1];
  console.log(num.value);
  let val = parseInt(num.value);
  if (val < 4){
    num.value = val + 1;
  }
}

const decrementDeck = (e) => {
  console.log("decrement")
  let num = e.target.parentNode.childNodes[1];
  console.log(num.value);
  let val = parseInt(num.value);
  if (val > 1){
    num.value = val - 1;
  }

  if (num.type == "hidden"){
    num.type = "text";
  }
}

function Deck() {
  const [cards, setCards] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let result = await axios("/deck");
      let deck = result.data;
      deck = Object.entries(deck);
      // console.log(deck);
      setCards(deck);
    };
    
    fetchData();
  }, [])

  return (
    <div>
      <div class="heading">Deck</div>

      {cards.map((element) => (
        <form class="card-display" action="/update" method="POST">
          <img class="card" key={element[1].id} src={element[1].img}></img>
          <span class="number-display">{element[1].number}
            <input class="input-deck" type="hidden" value={element[1].number}></input>
            <i class="fa-solid fa-arrow-up arrow-up-deck" onClick={incrementDeck}></i>
            <i class="fa-solid fa-arrow-down arrow-down-deck" onClick={decrementDeck}></i>
          </span>
          
        </form>
      ))
      }
    </div>
  )
}

const increment = () => {
  // console.log("increment");
  let num = document.querySelector(".card-number");
  let val = parseInt(num.value);
  if (val < 4){
    num.value = val + 1;
  }
}

const decrement = () => {
  console.log("decrement")
  let num = document.querySelector(".card-number");
  let val = parseInt(num.value);
  if (val > 1){
    num.value = val - 1;
  }
}

const Search = () => {
  clearCards()

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

  const navigate = useNavigate();

  const addCard = (e) => {
      
    let image = e.target.parentNode.parentNode.parentNode.firstChild.src;
    let num = e.target.parentNode.childNodes[2].value;
    console.log(num);

    let data = {
      "img": image,
      "number": num
    }

    // console.log(data);

    fetch('http://localhost:3001/add',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'mode': 'no-cors'
      },
      method: "POST",
      body: JSON.stringify(data)
    })

    navigate("/");
  };

  const addButton = (e) => {
      
    let c = document.createElement("p");
    c.className = "proxy";
    
    e.target.append(c);

    let buttonBox = (
      <p class="button-box">
        <i class="fa-solid fa-arrow-up arrow-up-search" onClick={increment}></i>
        <i class="fa-solid fa-arrow-down arrow-down-search" onClick={decrement}></i>
        <input type="text" className="card-number" value="1"></input>
        <button className="card-add" onClick={addCard}>add</button>
      </p>
    )

    reactDOM.hydrate(buttonBox, document.querySelector('.proxy'));
  }

  const removeButton = (e) => {
    let cont = e.target;

    cont.lastChild.remove();
  }

  const searchCard = (e) => {
    // Prevent Refresh
    e.preventDefault();
     
    // delete previous search
    clearCards();

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
  
              // let button = document.createElement('button');
              // button.className = "card-add";
              // button.innerText = "add";
              
              let container = document.createElement('span');
              container.className = "search-container";
              container.onmouseenter = addButton;
              container.onmouseleave = removeButton;
              
              container.appendChild(card);
              // container.appendChild(button);
              document.querySelector('.card-mat').append(container);
            })
          } else {
            alert("Couldn't find a card by that name!");
          }
          

        })
      )
  }

  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      {/* <script src="https://use.fontawesome.com/78fabb6acb.js"></script> */}
      <div class="search-box">
        <div class="heading2">Search</div>
        <input class="search-input" type="text" placeholder="Wrath of God" name="search" onChange={handleChange}></input>
        <button class="search" onClick={searchCard}>Search</button>
      </div>
      <div class="card-mat">

      </div>
    </div>
  )
  
}


export default App;
