import React from "react";
import "../Styles/register.css";
import { useForm } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message';
import { useHistory } from "react-router-dom";

export default function Register() {

  const history = useHistory()  
  const onRedirect = () => {
      let url = "/login"
      history.push(url)
  }
  

  const { register, formState: { errors }, handleSubmit} = useForm()

  const onSubmit = data => fetch("https://127.0.0.1:8000/users/new",  { 
      method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "accept": "application/ld+json"
        },
        body: JSON.stringify({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
        })
    })
    .then(res => res.json())
    .then(resp => {
      if(resp === "OK") {
        let error = document.getElementById('error');
        error.classList.remove('active');

        let success = document.getElementById('success');
        success.classList.add('active');
        // document.getElementById("redirect").setAttribute("content", "3;URL=/login");
      } else if(resp === "already taken") {
        let success = document.getElementById('success');
        success.classList.remove('active');

        let error = document.getElementById('error');
        error.classList.add('active');
      } else if(resp === "invalid email") {
        let success = document.getElementById('success');
        success.classList.remove('active');

        let error = document.getElementById('error');
        error.classList.remove('active');
      }
    })



  // Formulaire d'inscription

  return (
    <div>

      <div className="header_title">
        <h2>Inscription</h2>
      </div>
      <div className="user-form-container">
        <div className="form-center">
          <form className="user-form" onSubmit={handleSubmit(onSubmit)}>

            <h1>Créez votre compte</h1>

          <label htmlFor="firstName">
            Prénom : 
          </label>
              <input
                {...register('firstName', {required : 'Vous devez inscrire votre prénom'})}
                type="text" 
                id="firstName"
                />       
                <ErrorMessage
                errors={errors}
                name="firstName"
                render={({ message }) => <p>{message}</p>}
                />

          <label htmlFor="lastName">
            Nom : 
          </label>
              <input
                {...register('lastName', {required : 'Vous devez inscrire votre nom'})}
                type="text"
                id="lastName"
                />   
                <ErrorMessage
                errors={errors}
                name="lastName"
                render={({ message }) => <p>{message}</p>}
              />    

            <label htmlFor="email">
              Email :
            </label>
              <input
                {...register('email', {required : 'Veuillez entrer un email valide'})}
                type="email"
                id="email"
                />
                <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => <p>{message}</p>}
                />
            
            <label htmlFor="password">
              Password :
            </label>
              <input
                {...register('password', {required : 'Veuillez entrer un mot de passe valide', minLength: {value : 7, message: 'Votre mot de passe doit au moins faire 7 caractères !'} })}
                type="password"
                id="password"
                />
                <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => <p>{message}</p>}
              />
            <p id="error">Cet email est déjà utilisé !</p>
            <p id="success">Vous avez été inscrit !</p>
            <button type="submit">S'inscrire</button>
            <button onClick={() => onRedirect()}>
              Formulaire de connexion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}