import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar.js";
import Accueil from "./Pages/Accueil";
import Boutique from "./Pages/Boutique.js";
import AdminGame from "./Pages/AdminGame.js";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
import Panier from "./Pages/Panier.js";
import Tous_les_jeux from "./Pages/Tous_les_jeux";
import Categorie from "./Pages/Categorie";
import Platform from "./Pages/Platform";
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";
import SearchPage from "./Pages/SearchPage";
import switch_icon from "./img/switch.png";


function App() {
  window.localStorage.setItem('userId', '');
  window.localStorage.setItem('userEmail', '');
  window.localStorage.setItem('userFirstName', '');
  window.localStorage.setItem('userLastName', '');
  window.localStorage.setItem('userRoles', '');
  const [islog, setIslog] = useState(false);
  const [currentUser ,setCurrentUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentBasket, setCurrentBasket] = useState([]);

  return (
    <div className="App">
      <Router>
        <div>
          <NavBar islog={islog} setIslog={setIslog} currentUser={currentUser} setCurrentUser={setCurrentUser} isAdmin={isAdmin} setIsAdmin={setIsAdmin} currentBasket={currentBasket} />
        </div>
        <div className="main-content">
          <div className="content">
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
            <Switch>
              <Route exact path="/">
                <Accueil currentBasket={currentBasket} setCurrentBasket={setCurrentBasket} />
              </Route>
              <Route path="/accueil">
                <Accueil currentBasket={currentBasket} setCurrentBasket={setCurrentBasket} />
              </Route>
              <Route path="/boutique">
                <Boutique />
              </Route>
              <Route path="/tous_les_jeux">
                <Tous_les_jeux currentBasket={currentBasket} setCurrentBasket={setCurrentBasket} />
              </Route>
              <Route path="/categorie_rpg">
                <Categorie categorie={"rpg"} currentBasket={currentBasket} setCurrentBasket={setCurrentBasket} />
              </Route>
              <Route path="/categorie_aventure">
                <Categorie categorie={"aventure"} currentBasket={currentBasket} setCurrentBasket={setCurrentBasket}/>
              </Route>
              <Route path="/categorie_action">
                <Categorie categorie={"action"} currentBasket={currentBasket} setCurrentBasket={setCurrentBasket}/>
              </Route>
              <Route path="/categorie_tir">
                <Categorie categorie={"tir"} currentBasket={currentBasket} setCurrentBasket={setCurrentBasket}/>
              </Route>
              <Route path="/categorie_survie">
                <Categorie categorie={"survie"} currentBasket={currentBasket} setCurrentBasket={setCurrentBasket}/>
              </Route>
              <Route path="/plateforme_playstation_5">
                <Platform platform={"ps5"} logo={<i class="fab fa-playstation playstation_icon"></i>} currentBasket={currentBasket} setCurrentBasket={setCurrentBasket} />
              </Route>
              <Route path="/plateforme_xbox">
                <Platform platform={"xbox"} logo={<i class="fab fa-xbox xbox_icon"></i>} currentBasket={currentBasket} setCurrentBasket={setCurrentBasket} />
              </Route>
              <Route path="/plateforme_switch">
                <Platform platform={"switch"} logo={<img id="switch-icon" src={switch_icon}/>} currentBasket={currentBasket} setCurrentBasket={setCurrentBasket} />
              </Route>
              <Route path="/plateforme_pc">
                <Platform platform={"pc"} logo={<i className="fab fa-windows windows_icon"></i>} currentBasket={currentBasket} setCurrentBasket={setCurrentBasket} />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login setIslog={setIslog} setCurrentUser={setCurrentUser} currentUser={currentUser} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
              </Route>
              <Route path="/Panier">
                <Panier setCurrentUser={setCurrentUser} currentUser={currentUser} currentBasket={currentBasket} setCurrentBasket={setCurrentBasket} />
              </Route>
              <Route path="/profile">
                <Profile setCurrentUser={setCurrentUser} currentUser={currentUser} />
              </Route>
              <Route path="/admin">
                <Admin isAdmin={isAdmin} />
              </Route>
              <Route path="/game/:id">
                <AdminGame isAdmin={isAdmin} />
              </Route>
              <Route path="/toSearch/:name">
                <SearchPage currentBasket={currentBasket} setCurrentBasket={setCurrentBasket} />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
