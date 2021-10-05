import React, { useEffect, useState } from "react";
import CreateGame from "../components/CreateGame";

function SearchPage({setCurrentBasket, currentBasket}) {
  const [games, setGames] = useState(null);
  const url = window.location.href;
  const toFind = url.split("/").pop();

  useEffect(() => {
    const getGames = async () => {
      await fetch("https://127.0.0.1:8000/product/find", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          "accept": "application/ld+json",
        },
        body: JSON.stringify({
            toFind: toFind
        }),
      })
        .then((res) => res.json())
        .then((response) => setGames(response));
    };

    getGames();
  });

  if (!games) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div>
        <div className="header_title">
          <h2>Tous les jeux</h2>
        </div>
        <div className="container-card">
          <GameListing gameList={games} setCurrentBasket={setCurrentBasket} currentBasket={currentBasket} />
          </div>
        </div>
      // </div>
    );
  }
}

function GameListing(props) {
  let gameList = [];

  props.gameList.map((product) => (
    gameList.push(<CreateGame currentGame={product} setCurrentBasket={props.setCurrentBasket} currentBasket={props.currentBasket} />)
  ))

  return gameList;
}

export default SearchPage;
