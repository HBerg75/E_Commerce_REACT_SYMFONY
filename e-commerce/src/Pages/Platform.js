import React, {useState, useEffect} from "react";
import CreateGame from "../components/CreateGame";

function Platform({ platform, setCurrentBasket, currentBasket }) {
  const [games, setGames] = useState(null);

  // Remarque : le tableau vide de dépendances [] indique
  // que useEffect ne s’exécutera qu’une fois, un peu comme
  // componentDidMount()
  useEffect(() => {
    // const all_games
    const getGames = async () => {
      await fetch("https://127.0.0.1:8000/games_by_platform", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          accept: "application/ld+json",
        },
        body: JSON.stringify({
          platformName: { platform },
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
          <h2>{platform}</h2>
        </div>
        <div className="container-card">
          <GameListing gameList={games} currentBasket={currentBasket} setCurrentBasket={setCurrentBasket} />
        </div>
      </div>
    );
  }
}

function GameListing(props) {
  let gameList = [];

  props.gameList.map((product) =>
    gameList.push(<CreateGame currentGame={product} currentBasket={props.currentBasket} setCurrentBasket={props.setCurrentBasket} />)
  );

  return gameList;
}

export default Platform;