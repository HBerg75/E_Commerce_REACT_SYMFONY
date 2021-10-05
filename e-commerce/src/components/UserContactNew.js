import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import countries from "../components/countries";

function UserContactNew({ id_user }) {
    
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) =>
    fetch("https://127.0.0.1:8000/user/address/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/ld+json",
      },
      body: JSON.stringify({
        id_user: id_user,
        address: data.address,
        city: data.city,
        postal_code: data.postal_code,
        country: data.country,
        phone: data.phone,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        alert("Addresse enregistrée");
      });

  return (
      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Informations du compte</h1>

        <label htmlFor="address">Adresse :</label>
        <input
          {...register("address", {
            required: "Vous devez inscrire votre adresse",
          })}
          type="text"
          id="address"
        />
        <ErrorMessage
          errors={errors}
          name="address"
          render={({ message }) => <p>{message}</p>}
        />

        <label htmlFor="city">Ville :</label>
        <input
          {...register("city", {
            required: "Vous devez indiquer votre ville",
          })}
          type="text"
          id="city"
        />
        <ErrorMessage
          errors={errors}
          name="city"
          render={({ message }) => <p>{message}</p>}
        />

        <label>
          Country :
        </label><br/><br/>
        <select
          {...register("country", {
            required: "Vous devez indiquer votre ville",
          })}
        >
          <option key=""></option>
          {countries.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
        <ErrorMessage
          errors={errors}
          name="country"
          render={({ message }) => <p>{message}</p>}
        /><br/><br/>

        <label htmlFor="postal_code">Code postal :</label>
        <input
          {...register("postal_code", {
            required: "Veuillez entrer votre code postal",
          })}
          type="number"
          id="postal_code"
        />
        <ErrorMessage
          errors={errors}
          name="postal_code"
          render={({ message }) => <p>{message}</p>}
        />

        <label htmlFor="phone">Phone number :</label>
        <input
          {...register("phone", {
            required: "Veuillez entrer votre numéro de téléphone",
          })}
          type="number"
          id="phone"
        />
        <ErrorMessage
          errors={errors}
          name="phone"
          render={({ message }) => <p>{message}</p>}
        />

        <button type="submit">Enregister</button>
      </form>
  );
}

export default UserContactNew;
