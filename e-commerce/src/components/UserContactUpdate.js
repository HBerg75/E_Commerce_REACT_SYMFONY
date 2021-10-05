import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import countries from "../components/countries";

function UserContactUpdate({ user, id_user }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const update = (data) =>
    fetch("https://127.0.0.1:8000/user/address/update", {
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
        alert("Addresse modifiée");
      });

  return (
    <form className="user-form" onSubmit={handleSubmit(update)}>
      <h1>Informations du compte</h1>

      <label htmlFor="address">Adresse :</label>
      <input
        {...register("address", {
          required: "Vous devez inscrire votre adresse",
        })}
        type="text"
        id="address"
        defaultValue={user.address}
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
        defaultValue={user.city}
      />
      <ErrorMessage
        errors={errors}
        name="city"
        render={({ message }) => <p>{message}</p>}
      />

      <label>
        Country :
      </label><br></br>
        <select
          {...register("country", {
            required: "Vous devez indiquer votre ville",
          })}
        >
          <option key="">{user.country}</option>
          {countries.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
        <ErrorMessage
          errors={errors}
          name="country"
          render={({ message }) => <p>{message}</p>}
        /><br></br>
      <br></br>
      <label htmlFor="postal_code">Code postal :
      </label>
      <input
        {...register("postal_code", {
          required: "Veuillez entrer votre code postal",
        })}
        type="number"
        id="postal_code"
        defaultValue={user.postal_code}
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
        defaultValue={user.phone}
      />
      <ErrorMessage
        errors={errors}
        name="phone"
        render={({ message }) => <p>{message}</p>}
      />

      <button type="submit">Modifier</button>
    </form>
  );
}

export default UserContactUpdate;
