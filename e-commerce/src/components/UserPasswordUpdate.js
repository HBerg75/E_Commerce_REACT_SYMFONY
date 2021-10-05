import React, { useState, useEffect } from "react";

function UserPasswordUpdate({ setCurrentUser, currentUser }) {

  const [newPassword, setNewPassword] = useState(0);

    return (
        <form className="user-form user-form--small">
              <label htmlFor="password">
                Entrez votre nouveau mot de passe :
              </label>
              <input
                minLength="7"
                type="password"
                id="password"
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <p id="errorPassword"></p>
              <p id="successPassword" className="success"></p>

              <button
                onClick={(event) => {
                  event.preventDefault();
                  let success = document.getElementById("successPassword");
                  let error = document.getElementById("errorPassword");

                  if (newPassword === "" || newPassword.length <= 7) {
                    error.innerText = "Entrez au moins 7 caractères !";
                    success.innerText = "";

                    success.classList.remove("active");
                    error.classList.add("active");
                  } else {
                    fetch("https://127.0.0.1:8000/user/update/password", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        accept: "application/ld+json",
                      },
                      body: JSON.stringify({
                        id_user: currentUser.userId,
                        password: newPassword,
                      }),
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        if (data && data === "OK") {
                          error.innerText = "";
                          success.innerText = "Mot de passe changé !";

                          error.classList.remove("active");
                          success.classList.add("active");
                        } else {
                          error.innerText = "Une erreur est survenue !";
                          success.innerText = "";

                          success.classList.remove("active");
                          error.classList.add("active");
                        }
                      });
                  }
                }}
              >
                Changer le mot de passe
              </button>
            </form>
    )
}

export default UserPasswordUpdate
