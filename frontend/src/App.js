import './App.css';
import React, { useEffect, useState, createContext, useContext } from 'react';
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
import { useAppContext } from './context';

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

 const UpdateForm = (props) => {

    const [num, setNum] = useState(props.element[1].number);
    
    const handleSubmit = (evt) => {
        evt.preventDefault();

        let card = {
          img: props.element[1].img,
          number: num
        }

        console.log(card);

        let axiosConfig = {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
          }
        };

        axios
          .post('http://localhost:3001/update', card, axiosConfig)
          .then(() => console.log('update sent'))
          .catch(err => {
            console.log(err);
          })

          window.location.reload(true);
    }

    const incrementDeck = (e) => {
      let num = e.target.parentNode.childNodes[1];
      
      let val = parseInt(num.value);
    
      if (num.style.display != "inline"){
        num.style.display = "inline";
        num.value = val;
      }
    
      if (val < 4){
        setNum(val + 1);
      } else {
        setNum(val);
      }
    
      let button = e.target.parentNode.lastChild;
    
      if (button.type = "hidden"){
        button.type = "submit";
        button.value = "Update";
        let display = e.target.parentNode;
        // console.log(display);
        display.style.width = "90px";
      }
    }
    
    const decrementDeck = (e) => {
      
      let num = e.target.parentNode.childNodes[1];
      console.log(num);

      let val = parseInt(num.value);
    
      if (num.style.display != "inline"){
        num.style.display = "inline";
        num.value = val;
      }
    
      if (val > 0){
        setNum(val - 1);
      } else {
        setNum(val);
      }
    
      let button = e.target.parentNode.lastChild;
    
      if (button.type = "hidden"){
        button.type = "submit";
        button.value = "Update";
        let display = e.target.parentNode;
        // console.log(display);
        display.style.width = "90px";
      }
    }

    return (
      <form class="card-display" onSubmit={e => {handleSubmit(e)}}>
          <img class="card" key={props.element[1].id} src={props.element[1].img}></img>
          <span class="number-display">{props.element[1].number}
            <input class="input-deck" type="text" value={num}></input>
            <i class="fa-solid fa-arrow-up arrow-up-deck" onClick={incrementDeck}></i>
            <i class="fa-solid fa-arrow-down arrow-down-deck" onClick={decrementDeck}></i>
            <input class="hidden-submit" type="hidden"></input>
          </span>        
        </form>
    );
}

function Deck() {

  const {cards, fetchData, total } = useAppContext();

  useEffect(() => {
    
    fetchData();
  }, [])
  
  return (
    <>
      <div class="heading">
        Deck - {total} cards
      </div>
      <div class="deck">

          <div class="card-mat">
            {cards.map((element) => (
                <UpdateForm element={element} img={element[1].img} />
            ))
            }
          </div>
      </div>
    </>
  );
}

const increment = () => {
  let num = document.querySelector(".card-number");
  let val = parseInt(num.value);
  if (val < 4){
    num.value = val + 1;
  }
}

const decrement = () => {
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

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      }
    };

    axios
      .post('http://localhost:3001/add', data, axiosConfig)
      .then(() => console.log('update sent'))
      .catch(err => {
        console.log(err);
      })

      navigate("/");
      window.location.reload(true);
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
  
              // Card
              let card = document.createElement('img');
              card.src = image;
              card.className = "search-card";
              
              let container = document.createElement('span');
              container.className = "search-container";
              container.onmouseenter = addButton;
              container.onmouseleave = removeButton;
              
              container.appendChild(card);
              document.querySelector('.card-mat').append(container);
            })
          } else {
            alert("Couldn't find a card by that name!");
          }
        })
      )
  }

  return (
    <div class="search">
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
