import React, { useState, useEffect } from "react";
import CreateGame from "../components/CreateGame";

function Section_derniers_jeux({setCurrentBasket, currentBasket, games}) {
  return (
    <div>
      <div>
        <h3>Derniers jeux ajoutés</h3>
      </div>
      <div className="container-card section-border-bottom">
        <GameListing gameList={games} setCurrentBasket={setCurrentBasket} currentBasket={currentBasket} />
      </div>
      <br />
    </div>
  );
}

function GameListing(props) {
  let gameList = [];
  let reversedGameList = props.gameList.reverse();

  reversedGameList.slice(0,5).map((product) =>
    gameList.push(<CreateGame currentGame={product} setCurrentBasket={props.setCurrentBasket} currentBasket={props.currentBasket} />)
  );

  let reversed = gameList.reverse();

  return reversed;
}

export default Section_derniers_jeux;
