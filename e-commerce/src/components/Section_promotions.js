import React, { useState, useEffect } from 'react'
import CreateGame from "../components/CreateGame";

function Section_promotions({setCurrentBasket, currentBasket, games}) {
    return (
      <div>
        <div>
          <h3>Promotions</h3>
        </div>
        <div className="container-card">
          <GameListing gameList={games} setCurrentBasket={setCurrentBasket} currentBasket={currentBasket} />
          </div>
        </div>
    );
}

function GameListing(props) {
  let gameList = [];
  let countOfGames = 0;

  props.gameList.forEach(element => {
    if(element && countOfGames != 5) {
      if(element.reduction) {
        gameList.push(<CreateGame currentGame={element} setCurrentBasket={props.setCurrentBasket} currentBasket={props.currentBasket} />)
        countOfGames++;
      }
    } else {
      return gameList;
    }
  });

  return gameList;
}

export default Section_promotions
