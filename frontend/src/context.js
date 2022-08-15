import {useState, createContext, useContext} from 'react'
import axios from 'axios';

const initialState = {
    cards: [],
    total: 0,
}

const AppContext = createContext()

const AppProvider = ({ children }) => {

    const [cards, setCards] = useState(initialState.cards)
    const [total, setTotal] = useState(initialState.total);

    const updateTotal = (deck) =>{
        let tot = 0;
        deck.forEach((c) => {
            tot += parseInt(c[1].number);
        })
        setTotal(tot);
    }

    const fetchData = async () => {
      let result = await axios("/deck");
      let deck = result.data;
      deck = Object.entries(deck);
      setCards(deck);
      updateTotal(deck);
    };

    return (
        <AppContext.Provider value={{fetchData, cards, updateTotal, total}}>
            { children }
        </AppContext.Provider>
    )
}

 const useAppContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useAppContext}