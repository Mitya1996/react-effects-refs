import Card from "./Card";
import { useState, useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
const axios = require("axios");

const API_BASE_URL = "http://deckofcardsapi.com/api/deck";

function Game() {
  const [deck_id, setDeck_id] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);
  const timerRef = useRef(null);

  //useEffect for setting initial deck?
  useEffect(() => {
    async function getData() {
      let res = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
      setDeck_id(res.data.deck_id);
    }
    getData();
  }, [setDeck_id]);

  function toggleDraw() {
    setAutoDraw(!autoDraw);
  }

  function getCard() {
    //draw a card
    async function getData() {
      let res = await axios.get(`${API_BASE_URL}/${deck_id}/draw/?count=1`);
      //if no cards left
      if (res.data.remaining === 0) {
        setAutoDraw(false);
        alert("No cards left!");
        return;
      }
      let newCard = res.data.cards[0];
      setDrawn((oldDrawn) => [...oldDrawn, newCard]); //add card to pile
    }
    getData();
  }

  useEffect(() => {
    if (autoDraw && !timerRef.current) {
      timerRef.current = setInterval(async () => {
        await getCard();
      }, 100);
    }
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  });

  return (
    <>
      {/* button */}
      <Button onClick={toggleDraw} variant="contained">
        {autoDraw ? "STOP DRAWING!" : "START DRAWING!"}
      </Button>
      {drawn.map((cardData) => (
        <Card key={cardData.code} data={cardData} />
      ))}
      {/* cards map */}
    </>
  );
}

export default Game;
