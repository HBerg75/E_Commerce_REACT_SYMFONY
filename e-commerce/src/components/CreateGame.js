import React, { useEffect, useState } from "react";

function CreateGame(props) {
    var platformLogo = [];
    let basketButtonForm;
  
    let currentBasketToCheck = [];
    props.currentBasket.map(element => {
      currentBasketToCheck.push(element.name)
    });
  
    if(currentBasketToCheck.includes(props.currentGame.name)) {
      basketButtonForm = <>
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
              let alertAdd = document.getElementById('alertAdd');
              let alertRemove = document.getElementById('alertRemove');
              alertRemove.classList.add('active')
              alertAdd.classList.remove('active')
              newBasket.splice(index, 1);
              props.setCurrentBasket(newBasket)   

              break;
            }
          }
        }}
      >
      Retirer du panier
      </button>
      </>;
    } else {
      basketButtonForm = <>
      <button 
        className="submit_button" 
        type="submit"
        onClick={function(e) {
          let alertAdd = document.getElementById('alertAdd');
          let alertRemove = document.getElementById('alertRemove');
          let newBasket = props.currentBasket;
          newBasket.push(props.currentGame);
          props.setCurrentBasket(newBasket)   
          alertRemove.classList.remove('active')
          alertAdd.classList.add('active')
        }}
      >
      Ajouter au panier
      </button>
      </>;
    }
  
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
      return <div className="card" key={props.currentGame.name}>
        <div className="img-container">
          <img
            className="img-card"
            src={props.currentGame.picture}
            alt="img-card"
          />
          <div className="card__detail">
            {props.currentGame.description}
          </div>
        </div>
        <div className="container">
          <h4>{props.currentGame.name}{platformLogo}</h4>
          <p>{props.currentGame.price} &euro;</p>
          <button style={style}>{props.currentGame.categoryName}</button>
          {basketButtonForm}
        </div>
      </div>;
    } else {
      var priceWithReduction = props.currentGame.price - (props.currentGame.price * props.currentGame.reduction)/100;
      return <div className="card" key={props.currentGame.name}>
        <div className="img-container">
          <img
            className="img-card"
            src={props.currentGame.picture}
            alt="img-card"
          />
          <div className="card__detail">
            {props.currentGame.description}
          </div>
          <div className="img-text">-{props.currentGame.reduction}%</div>
        </div>
        <div className="container">
          <h4>{props.currentGame.name}{platformLogo}</h4>
          <p className="price-container"><span className="line-through">{props.currentGame.price} &euro;</span> <span className="reduction">{priceWithReduction} &euro;</span></p>
          <button style={style}>{props.currentGame.categoryName}</button>
          {basketButtonForm}
        </div>
      </div>;
    }
  }

  export default CreateGame;