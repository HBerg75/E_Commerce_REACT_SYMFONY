import React, { useState, useEffect } from "react";
import Carousel_banner from "../components/Carousel_banner";
import Section_derniers_jeux from "../components/Section_derniers_jeux";
import Section_promotions from "../components/Section_promotions";

function Accueil({setCurrentBasket, currentBasket}) {
  const [games, setGames] = useState(null);

  // Remarque : le tableau vide de dépendances [] indique
  // que useEffect ne s’exécutera qu’une fois, un peu comme
  // componentDidMount()
  useEffect(() => {
    // const all_games
    const getGames = async () => {
      await fetch("https://127.0.0.1:8000/tous_les_jeux", {
        method: "get",
        headers: {
          "Content-type": "application/json",
          accept: "application/ld+json",
        },
      })
        .then((res) => res.json())
        .then((response) => setGames(response));
    };

    getGames();
  }, []);

  if(!games) {
    return <div>... Loading</div>;
  } else {
    return (
      <div>
        <div className="header_title">
          <h2>Accueil</h2>
        </div>
        <div>
          <h2 className="main_title">Deluxe Gaming</h2>
          <h3>A la une</h3>
          <Carousel_banner gameList={games} setCurrentBasket={setCurrentBasket} currentBasket={currentBasket} />
        </div>
        <br />
        <Section_derniers_jeux currentBasket={currentBasket} setCurrentBasket={setCurrentBasket} games={games} />
        <Section_promotions currentBasket={currentBasket} setCurrentBasket={setCurrentBasket} games={games} />
      </div>
    );
  }
}

export default Accueil;
