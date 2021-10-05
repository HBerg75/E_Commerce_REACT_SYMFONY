import { NavLink } from "react-router-dom";
import switch_icon from "../img/switch.png";
import logo_icon from "../img/LOGO_FINAL.png";
import Carousel_menu from "./Carousel_menu.js";
import { useState } from "react";

function NavBar({ islog, setIslog, setCurrentUser, isAdmin, setIsAdmin }) {
  const [baseToFind, setBaseToFind] = useState("/toSearch/")
  const [toFind, setToFind] = useState("/toSearch/")
  function resetLocalStorage() {
    window.localStorage.setItem("userId", "");
    window.localStorage.setItem("userEmail", "");
    window.localStorage.setItem("userFirstName", "");
    window.localStorage.setItem("userLastName", "");
    window.localStorage.setItem("userRoles", "");

    setIslog(false);
    setCurrentUser('');
    setIsAdmin(false);
  }

  function responsiveNavbar() {
    var x = document.getElementById("mytopnav");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }

    var y = document.getElementById("dropdown");
    if (y.className === "dropdown"){
      y.className += "-mobile";
    }
    else{
      y.className = "dropdown";
    }
  }
  
  function changeClass() {
    var element = document.getElementById("dropdown");
    var width = window.screen.width;
    if(width > 960 && element.className === "dropdown-mobile"){
      element.className = "dropdown";
    }
    else if (width < 960) {
      element.className = "dropdown-mobile";
    }
  }
  
  window.addEventListener('resize', changeClass);

  window.onload=function() {
    var width = window.screen.width;
    if(width < 1000){
      var dropdown = document.getElementById("dropdown");
      dropdown.addEventListener('click', changeHeightNavbar)
    }
  }

  function changeHeightNavbar(){
    var width = window.screen.width;
    if(width > 960) {
      
    }
    var dropdown = document.getElementById("dropdown");
    if(dropdown.className === "dropdown-mobile"){
      
    }
    else{
      dropdown.className = "dropdown-mobile"
    }
    var dropdown_content = document.getElementById("dropdown-content");
    var column = document.getElementById("column3")
    if(dropdown_content.className === "dropdown-content"){
      dropdown_content.className = "";
    }
    else{
      dropdown_content.className = "dropdown-content";
    }
  }



  return (
    <div className="navbar" id="mytopnav">
      <div className="navbar-container">
        <img src={logo_icon} className="site_logo" alt="" />
        <NavLink to="/accueil" exact>
          Accueil
        </NavLink>
        <div className="dropdown" id="dropdown">
          <button className="dropbtn">
            Boutique
            <i className="fa fa-caret-down" style={{ marginLeft: "5px" }}></i>
          </button>
          <div className="dropdown-content" id="dropdown-content">
            <div className="header">
              <h2>Boutique</h2>
            </div>
            <div className="row">
              <div className="column">
                <h3 class="title-column">Jeux</h3>
                <NavLink to="tous_les_jeux">Tous les jeux</NavLink>
                <NavLink to="categorie_rpg">RPG</NavLink>
                <NavLink to="categorie_aventure">Aventure</NavLink>
                <NavLink to="categorie_action">Action</NavLink>
                <NavLink to="categorie_tir">Tir</NavLink>
                <NavLink to="categorie_survie">Survie</NavLink>
              </div>
              <div className="column">
                <h3 class="title-column">Plateforme</h3>
                <NavLink to="plateforme_playstation_5" id="list_playstation">
                  Playstation 5
                  <i class="fab fa-playstation playstation_icon"></i>
                </NavLink>
                <NavLink to="plateforme_xbox" id="list_xbox">
                  Xbox series X<i class="fab fa-xbox xbox_icon"></i>
                </NavLink>
                <NavLink to="plateforme_switch" id="list_nintendo">
                  Switch
                  <img src={switch_icon} class="switch_icon" alt="" />
                </NavLink>
                <NavLink to="plateforme_pc">
                  PC<i className="fab fa-windows windows_icon"></i>
                </NavLink>
              </div>
              <div className="column" id="column3">
                <Carousel_menu />
              </div>
            </div>
          </div>
        </div>

        {islog ? (
          <NavLink to="/accueil" onClick={resetLocalStorage}>
            Déconnexion
          </NavLink>
        ) : (
          <div>
            <NavLink to="/register" exact>
              S'inscrire
            </NavLink>
            <NavLink to="/login" exact>
              Se connecter
            </NavLink>
          </div>
        )}

        <div className="panier_form">
          {isAdmin ? (
            <NavLink  to="/admin" exact>
              <i class="fa fa-cog" aria-hidden="true"></i>
            </NavLink>
          ) : (
            <span></span>
          )}

          {islog ? (
            <NavLink  to="/profile" exact>
              <i class="fas fa-user profile"></i>
            </NavLink>
          ) : (
            <span></span>
          )}
          <div className="search_container">
            <NavLink to="/panier" exact>
              <i class="fas fa-shopping-cart panier"></i>
            </NavLink>
            <input id="search" type="text" onChange={(event) => 
              {
                event.preventDefault()
                setToFind( baseToFind + event.target.value)} 
              }/>
            <NavLink to={toFind} exact id="submit"> 
              <i class="fa fa-search"></i>
            </NavLink>
          </div>
        </div>
      </div>
      <a href="javascript:void(0);" class="icon" onClick={responsiveNavbar}>
        <i class="fa fa-bars"></i>
      </a>
    </div>
  );
}

export default NavBar;