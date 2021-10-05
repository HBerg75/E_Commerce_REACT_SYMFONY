import React, { useState, useEffect } from "react";
import "../Styles/form.css";
import UserContactNew from "../components/UserContactNew";
import UserContactUpdate from "../components/UserContactUpdate";
import UserMailUpdate from "../components/UserMailUpdate";
import UserPasswordUpdate from "../components/UserPasswordUpdate";

export default function Profile({ setCurrentUser, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      await fetch("https://127.0.0.1:8000/user/address/get", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          accept: "application/ld+json",
        },
        body: JSON.stringify({
          id_user: currentUser.userId,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status == 500) {
            setUser(false);
          } else {
            setUser(response);
          }
        });
    };
    getUser();
  }, []);

  // Formulaire de compte
  if (!user) {
    return (
      <div>
        <div className="header_title">
          <h2>
            Profil : {currentUser.userFirstName} {currentUser.userLastName}
          </h2>
        </div>
        <div className="user-form-container">
          <div className="form-center form-center2">
            <UserContactNew
              id_user={currentUser.userId}
              user={user}
              setUser={setUser}
            />
            <div className="user-form-container2">
              <UserPasswordUpdate currentUser={currentUser} />

              <UserMailUpdate currentUser={currentUser} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="header_title">
          <h2>
            Profil : {currentUser.userFirstName} {currentUser.userLastName}
          </h2>
        </div>
        <div className="container-forms">
          <div className="user-form-container">
            <div className="form-center form-center2">
              <div>
              <UserContactUpdate
                id_user={currentUser.userId}
                user={user}
                setUser={setUser}
              />
              </div>
            </div>
            <div  className="form-center">
              <div>
                <UserPasswordUpdate currentUser={currentUser} />

                <UserMailUpdate currentUser={currentUser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
