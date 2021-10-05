import React from 'react'
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

function Carousel_banner(props) {
    return (
        <div style={{maxWidth: "100%%", margin: "auto"}}>
            <Carousel_list gameList={props.gameList} setCurrentBasket={props.setCurrentBasket} currentBasket={props.currentBasket} />
        </div>
    )
}

function Carousel_list(props) {
    let carousel_array = [];
    let countOfGames = 0;
    let shuffledGames = props.gameList
    shuffledGames.sort(() => Math.random() - 0.5);

    shuffledGames.forEach(element => {
        if(element && countOfGames != 4) {
            carousel_array.push(<Carousel_item currentGame={element} setCurrentBasket={props.setCurrentBasket} currentBasket={props.currentBasket} />)
            countOfGames++;
        } else {
            return <Carousel infiniteLoop useKeyboardArrows autoPlay interval="2000">
                {carousel_array}
            </Carousel>;
        }
    })
    
    return <Carousel infiniteLoop useKeyboardArrows autoPlay interval="2000">
            {carousel_array}
    </Carousel>;
}

function Carousel_item(props) {
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
        className="submit_button panier_button submit_button--remove" 
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
        className="submit_button panier_button" 
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

    let platformLogo = [];
    props.currentGame.platform.forEach(element => {
        platformLogo.push(<img className="logo-platform carousel_logo carousel_logo_fix" src={element.logo}></img>);
    });

    if(props.currentGame.reduction === null || props.currentGame.reduction === undefined) {
        return <div className="carousel_element" style={{backgroundImage: `url("` + props.currentGame.picture + '")' }}>
            <div className="container carousel_item_bar">
              <div className="card__detail">
                {props.currentGame.description}
              </div>
                <h4 className="title-container">{props.currentGame.name}{platformLogo}</h4>
                <p className="price-container">{props.currentGame.price} &euro;</p>
                <button style={style}>{props.currentGame.categoryName}</button>
                {basketButtonForm}
            </div>
        </div>;
    } else {
        var priceWithReduction = props.currentGame.price - (props.currentGame.price * props.currentGame.reduction)/100;
        return <div className="carousel_element" style={{backgroundImage: `url("` + props.currentGame.picture + '")' }}>
            <div className="container carousel_item_bar">
            <div className="card__detail">
              {props.currentGame.description}
            </div>
            <h4 className="title-container">{props.currentGame.name}{platformLogo}</h4>
            <button style={style}>{props.currentGame.categoryName}</button>
            <p className="price-container"><span className="line-through">{props.currentGame.price} &euro;</span>  /  <span className="reduction">{priceWithReduction} &euro;</span></p>
            {basketButtonForm}
            </div>
        </div>;
    }
}

export default Carousel_banner;