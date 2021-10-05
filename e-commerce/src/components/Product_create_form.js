import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useHistory } from "react-router-dom";

export default function Product_create_form(props) {
    const [categoryList, setCategoryList] = useState(null);
    const [platformsList, setPlatformsList] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
          await fetch("https://127.0.0.1:8000/allCategories", {
            method: "get",
            headers: {
              "Content-type": "application/json",
              "accept": "application/ld+json",
            },
          })
            .then((res) => res.json())
            .then((response) => {
              setCategoryList(response)
            });
        };

        const getPlatforms = async () => {
            await fetch("https://127.0.0.1:8000/allPlatforms", {
              method: "get",
              headers: {
                "Content-type": "application/json",
                "accept": "application/ld+json",
              },
            })
              .then((res) => res.json())
              .then((response) => {
                setPlatformsList(response)
            });
        };
    
        getCategories();
        getPlatforms();
      }, []);
    
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) =>
        fetch("https://127.0.0.1:8000/product/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/ld+json",
            },
            body: JSON.stringify({
                productName: data.productName,
                productDescription: data.productDescription,
                productPrice: data.productPrice,
                productPublished: data.productPublished,
                productPicture: data.productPicture,
                productReduction : data.productReduction,
                productCategory: data.productCategory,
                productPlatforms: data.productPlatforms
            }),
        })
        .then((res) => res.json())
        .then((resp) => {
            alert('Produit ajouté !')
        });

    if(!categoryList || !platformsList) {
        return <div>Chargement...</div>;
    } else {
        return(
            <form className="user-form admin-form" onSubmit={handleSubmit(onSubmit)}>
                <h1>Ajouter un produit</h1>
    
                <label htmlFor="category">Catégories :</label>
                <select 
                    {...register("productCategory", {
                        required: "Veuillez choisir une catégorie",
                    })}
                    >
                    <option key=""></option>
                    {categoryList.map(categorie => (
                        <option key={categorie.name} value={categorie.name}>{categorie.name}</option>
                    ))}
                </select>
                <ErrorMessage
                    errors={errors}
                    name="productCategory"
                    render={({ message }) => <p>{message}</p>}
                />

                <label htmlFor="" style={{paddingTop: 10}}>Plateformes : </label>
                <div className="platform_inputs_container">
                    {platformsList.map(platform => (
                        <div>
                            <label htmlFor={platform.name}>{platform.name}</label>
                            <input 
                                {...register("productPlatforms", {
                                    required: "Veuillez choisir au moins une plateforme",
                                })}
                                type="checkbox" 
                                key={platform.name} 
                                id={platform.name} 
                                value={platform.name} 
                            />
                        </div>
                    ))}
                </div>
                <ErrorMessage
                    errors={errors}
                    name="productPlatforms"
                    render={({ message }) => <p>{message}</p>}
                />

                <label htmlFor="productPublished">Date de sortie :</label>
                <input
                    {...register("productPublished", {
                        required: "Vous devez indiquer la date de sortie",
                    })}
                    type="date"
                    id="productPublished"
                />
                <ErrorMessage
                    errors={errors}
                    name="productPublished"
                    render={({ message }) => <p>{message}</p>}
                />
    
                <label htmlFor="name">Nom du jeu :</label>
                <input
                    {...register("productName", {
                    required: "Veuillez entrer un nom pour le jeu",
                    })}
                    type="text"
                    id="productName"
                />
                <ErrorMessage
                    errors={errors}
                    name="productName"
                    render={({ message }) => <p>{message}</p>}
                />
    
                <label htmlFor="productDescription">Entrez une description du jeu :</label>
                <input
                    {...register("productDescription", {
                    required: "Veuillez entrer une description",
                    })}
                    type="text"
                    id="productDescription"
                />
                <ErrorMessage
                    errors={errors}
                    name="productDescription"
                    render={({ message }) => <p>{message}</p>}
                />
    
                <label htmlFor="productPrice">Entrez un prix (en euros) :</label>
                <input
                    {...register("productPrice", {
                    required: "Veuillez entrer un prix",
                    })}
                    type="text"
                    id="productPrice"
                />
                <ErrorMessage
                    errors={errors}
                    name="productPrice"
                    render={({ message }) => <p>{message}</p>}
                />
    
            <label htmlFor="productPicture">Entrez L'url de l'image du jeu :</label>
                <input
                    {...register("productPicture", {
                    required: "Veuillez entrer l'url de l'image du jeu",
                    })}
                    type="text"
                    id="productPicture"
                />
                <ErrorMessage
                    errors={errors}
                    name="productPicture"
                    render={({ message }) => <p>{message}</p>}
                />
    
            <label htmlFor="productReduction">Entrez une reduction (en %) :</label>
                <input
                    {...register("productReduction")}
                    type="number"
                    id="productReduction"
                />
                <button type="submit">Créer</button>
            </form>
        )
    }
}