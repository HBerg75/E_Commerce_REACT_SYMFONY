import React, {useState, useEffect} from "react";
import "../Styles/form.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import paiement_type from "../components/paiement_type";
import PayPal from "../components/PayPal";

export default function Panier({ currentUser, currentBasket, setCurrentBasket}) {

  const { register, formState: { errors }, handleSubmit } = useForm();

  const [user, setUser] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkout, setCheckOut] = useState(false);

  function calculateTotal(currentBasket) {
    let currentPrice = totalPrice;
    currentBasket.forEach(currentGame => {
      if(currentGame.reduction === null || currentGame.reduction === undefined) {
        currentPrice += currentGame.price
      } else {
        var priceWithReduction = currentGame.price - (currentGame.price * currentGame.reduction)/100;
        currentPrice += priceWithReduction
      }
    });
    setTotalPrice(currentPrice) 
  }
  
  useEffect(() => {
    calculateTotal(currentBasket)
  }, []);

  if(currentBasket.length !== 0) {

    return ( 
    <div>
      <div className="header_title">
        <h2>Panier</h2>
      </div>
        <div className="user-form-container user-form-container--justifyCenter">
  
        <div className="user-form1 user-form user-form--smallHeight" >
            <h1>Moyen de paiement</h1>
  
          {/* PAYPAL */}
  
          {checkout ? (
            <PayPal totalPrice={totalPrice} />
          ) : (
            <button type="submit"
              onClick={() => {
                setCheckOut(true);
              }}
            >
              Choisissez votre mode de paiement
            </button>
          )}
          </div>
          <GameListing gameList={currentBasket} setCurrentBasket={setCurrentBasket} currentBasket={currentBasket} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
        </div>
      </div>
    );
  } else {
    return <div>
      <div className="header_title">
        <h2>Panier</h2>
      </div>
      <div className="user-form-container" style={{justifyContent: "center", marginTop: "20px"}}>
        <GameListing gameList={currentBasket} setCurrentBasket={setCurrentBasket} currentBasket={currentBasket} totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
      </div>
    </div>
  }

}

function GameListing(props) {
  let gameList = [];
  let currentId = 0;
  if(props.gameList.length == 0) {
    return <section className="basket_content">
        <div className="basket_content__noArcticle">Aucun article dans le pannier</div>
    </section>;
  } else {
    props.gameList.map((product) => (
      gameList.push(<CreateGame currentGame={product} setCurrentBasket={props.setCurrentBasket} currentBasket={props.currentBasket} currentId={currentId} totalPrice={props.totalPrice} setTotalPrice={props.setTotalPrice} />),
      currentId++
    ))

    return <section className="basket_content">
      {gameList}
      <p className="basket_content__price"><strong>Prix total : {props.totalPrice} &euro;</strong></p>
    </section>;
  }
}

function CreateGame(props) {
  var platformLogo = [];
  let removeFromBasket = <>
    <div id="alertRemove" className="alert alert--danger">
      <div className="alert__suppression"
        onClick={function(e) {
          let alertRemove = document.getElementById("alertRemove");
          alertRemove.classList.remove('active');
        }}
      >
        <span className="alert__suppression__cross">X</span>
      </div>
      Produit supprimé
    </div>
  <div id="alertAdd" className="alert alert--success">
    <span className="alert__suppression"
      onClick={function(e) {
        let alertAdd = document.getElementById("alertAdd");
        alertAdd.classList.remove('active');
      }}
    >
      <span className="alert__suppression__cross">X</span>
    </span>
    Produit ajouté
  </div>
  <button 
    className="submit_button submit_button--remove" 
    type="submit"
    onClick={function(e) {
      let newBasket = props.currentBasket;
      for (let index = 0; index < newBasket.length; index++) {
        const element = newBasket[index].name;
        if(element == props.currentGame.name) {
          let currentElement = document.getElementById("element" + props.currentId);
          currentElement.style.display = "none"
          if(props.currentGame.reduction === null || props.currentGame.reduction === undefined) {
            let newPrice = props.totalPrice - props.currentGame.price
            props.setTotalPrice(newPrice)
          } else {
            var priceWithReduction = props.currentGame.price - (props.currentGame.price * props.currentGame.reduction)/100;
            let newPrice = props.totalPrice - priceWithReduction
            props.setTotalPrice(newPrice)
          }

          let alertAdd = document.getElementById('alertAdd');
          let alertRemove = document.getElementById('alertRemove');
          alertRemove.classList.add('active')
          alertAdd.classList.remove('active')
          newBasket.splice(index, 1);
          props.setCurrentBasket(newBasket)
        }
      }
    }}
  >
  Retirer du panier
  </button>
  </>;

  const style = {
    backgroundColor: props.currentGame.categoryColor,
    border: 'none',
    color: 'black',
    borderRadius: '10px',
    padding: '8px',
    display: 'block',
    cursor: 'pointer',
    marginBottom: '10px'
  }
  props.currentGame.platform.forEach(element => {
    platformLogo.push(<img className="logo-platform" src={element.logo}></img>);
  });
  if(props.currentGame.reduction === null || props.currentGame.reduction === undefined) {
    return <div className="card card--basket" id={"element" + props.currentId} key={props.currentGame.name}>
      <div className="img-container">
        <img
          className="img-card"
          src={props.currentGame.picture}
          alt="img-card"
        />
      </div>
      <div className="container">
        <h4>{props.currentGame.name}{platformLogo}</h4>
        <p>{props.currentGame.price} &euro;</p>
        <p>Description : {props.currentGame.description}</p>
        <button style={style}>{props.currentGame.categoryName}</button>
        {removeFromBasket}
      </div>
    </div>;
  } else {
    var priceWithReduction = props.currentGame.price - (props.currentGame.price * props.currentGame.reduction)/100;
    return <div className="card card--basket" id={"element" + props.currentId} key={props.currentGame.name}>
      <div className="img-container">
        <img
          className="img-card"
          src={props.currentGame.picture}
          alt="img-card"
        />
        <div className="img-text">-{props.currentGame.reduction}%</div>
      </div>
      <div className="container">
        <h4>{props.currentGame.name}{platformLogo}</h4>
        <p className="price-container"><span className="line-through">{props.currentGame.price} &euro;</span> <span className="reduction">{priceWithReduction} &euro;</span></p>
        <p>Description : {props.currentGame.description}</p>
        <button style={style}>{props.currentGame.categoryName}</button>
        {removeFromBasket}
      </div>
    </div>;
  }
}
