import React, {useState, useEffect} from "react";
import CreateGame from "../components/CreateGame";

function Categorie({categorie, setCurrentBasket, currentBasket}) {
    // const [error, setError] = useState(null);
    //   const [isLoaded, setIsLoaded] = useState(false);
    const [games, setGames] = useState(null);
  
    // Remarque : le tableau vide de dépendances [] indique
    // que useEffect ne s’exécutera qu’une fois, un peu comme
    // componentDidMount()
    useEffect(() => {
      // const all_games
      const getGames = async () => {
        await fetch("https://127.0.0.1:8000/games", {
          method: "post",
          headers: {
            "Content-type": "application/json",
            "accept": "application/ld+json",
          },
          body: JSON.stringify({
            categoryName: {categorie},
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
            <h2>{categorie}</h2>
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
  
  export default Categorie;
