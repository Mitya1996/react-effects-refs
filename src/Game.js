import Card from './Card';
import {useState, useEffect} from 'react';
import { Button } from '@material-ui/core';
const axios = require('axios');

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

function Game(){
    let [deck_id, setDeck_id] = useState(null);
    let [drawn, setDrawn] = useState([]);

    //useEffect for setting initial deck? 
    useEffect(() => {
        async function getData(){
            let res = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
            setDeck_id(res.data.deck_id);
        }
        getData();
    }, [setDeck_id])

    function handleClick(){
        //draw a card
        async function getData(){
            let res = await axios.get(`${API_BASE_URL}/${deck_id}/draw/?count=1`);
            let newCard = res.data.cards[0];
            setDrawn(oldDrawn => [...oldDrawn, newCard]); //add card to pile
        }
        getData();
    }
    return <>
    {/* button */}
    <Button onClick={handleClick} variant="contained">GIMME A CARD!</Button>
    {drawn.map(cardData => <Card key={cardData.code} data={cardData}/>)}
    {/* cards map */}

    </>
}

export default Game;