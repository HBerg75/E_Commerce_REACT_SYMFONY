import React, { useState } from "react";

function UserMailUpdate({ setCurrentUser, currentUser }) {
  
  const [newEmail, setNewEmail] = useState(0);
  
  return (
    <form className="user-form user-form--small">
      <label htmlFor="email">Entrez votre votre nouvelle email :</label>
      <input
        type="email"
        id="email"
        defaultValue={currentUser.userEmail}
        onChange={(event) => setNewEmail(event.target.value)}
        />
      <p id="errorEmail"></p>
      <p id="successEmail" className="success"></p>

      <button
        onClick={(event) => {
          event.preventDefault();
          let success = document.getElementById("successEmail");
          let error = document.getElementById("errorEmail");
          let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          let emailToCheck = document.getElementById('email');

          if(emailToCheck.value == currentUser.userEmail) {
            success.classList.remove("active");
              error.classList.add("active");
              
              error.innerText = "Vous devez choisir un nouvelle email !";
              success.innerText = "";
          } else if (newEmail.match(emailRegex)) {
            fetch("https://127.0.0.1:8000/user/update/email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                accept: "application/ld+json",
              },
              body: JSON.stringify({
                id_user: currentUser.userId,
                email: newEmail,
              }),
            })
            .then((response) => response.json())
            .then((data) => {
              if (data && data === "OK") {
                // setCurrentUser({
                //   userId: currentUser.userId,
                //   userEmail: newEmail,
                //   userFirstName: currentUser.userFirstName,
                //   userLastName: currentUser.userLastName,
                //   userRoles: currentUser.userRoles,
                // });
                
                error.innerText = "";
                success.innerText = "Email changé !";
                
                error.classList.remove("active");
                success.classList.add("active");
              } else {
                success.classList.remove("active");
                error.classList.add("active");
                
                error.innerText = "Une erreur est survenue !";
                success.innerText = "";
              }
            });
          } else {
            success.classList.remove("active");
            error.classList.add("active");
            
            error.innerText = "Email invalide !";
            success.innerText = "";
          }
        }}
      >
        Changer l'email
      </button>
    </form>
  );
}

export default UserMailUpdate;
