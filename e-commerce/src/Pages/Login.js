import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useHistory } from "react-router-dom";

export default function Login({setIslog, setCurrentUser, setIsAdmin}) {
  const history = useHistory();
  const onRedirect = () => {
    let url = "/accueil";
    history.push(url);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) =>
    fetch("https://127.0.0.1:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/ld+json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        // Si resp est un number , celui-ci correspond à l'id de la personne qui est renvoyé lors de la connexion, l'email ou le mot de passe est incorrect
        if (resp === "Wrong authentification") {
          let success = document.getElementById("success");
          success.classList.remove("active");

          let error = document.getElementById("error");
          error.classList.add("active");
        } else if (typeof resp === "object") {
          let error = document.getElementById("error");
          error.classList.remove("active");

          let success = document.getElementById("success");
          success.classList.add("active");

          setIslog(true);

          window.localStorage.setItem("userId", resp.id);
          window.localStorage.setItem("userEmail", resp.email);
          window.localStorage.setItem("userFirstName", resp.firstName);
          window.localStorage.setItem("userLastName", resp.lastName);
          if (resp.roles.includes("ROLE_ADMIN")) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }

          setCurrentUser({
            "userId": resp.id,
            "userEmail": resp.email,
            "userFirstName": resp.firstName,
            "userLastName": resp.lastName,
            "userRoles": resp.roles
          })
          
          onRedirect();
        }
      }, []);

  // Formulaire de connexion

  return (
    <div>
      <div className="header_title">
        <h2>Connexion</h2>
      </div>
      <div className="user-form-container">
        <div className="form-center">
          <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Se connecter</h1>

            <label htmlFor="email">Email :</label>
            <input
              {...register("email", {
                required: "Veuillez entrer un email valide",
              })}
              type="email"
              id="email"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <p>{message}</p>}
            />

            <label htmlFor="password">Password :</label>
            <input
              {...register("password", {
                required: "Veuillez entrer un mot de passe valide",
                minLength: {
                  value: 7,
                  message:
                    "Votre mot de passe doit au moins faire 7 caractères !",
                },
              })}
              type="password"
              id="password"
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <p>{message}</p>}
            />
            <p id="error">Mauvais identifiant ou mot de passe !</p>
            <p id="success">Vous êtes connecté !</p>
            <button type="submit">Se connecter</button>
            <button onClick={() => onRedirect()}>Formulaire d'inscription</button>
          </form>
        </div>
      </div>
    </div>
  );
}
