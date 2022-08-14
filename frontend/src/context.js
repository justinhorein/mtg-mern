import {useState, createContext, useContext} from 'react'
import axios from 'axios';


const AppContext = createContext()

const AppProvider = ({ children }) => {

    const [cards, setCards] = useState([])

    const fetchData = async () => {
      let result = await axios("/deck");
      let deck = result.data;
      deck = Object.entries(deck);
      console.log("deck: " + deck);
      setCards(deck);
    };


    return (
        <AppContext.Provider value={{fetchData, cards}}>
            { children }
        </AppContext.Provider>
    )
}

 const useAppContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useAppContext}