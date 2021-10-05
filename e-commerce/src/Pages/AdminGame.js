import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useHistory } from "react-router-dom";

function AdminGame({isAdmin}) {
    const history = useHistory();
    const onRedirect = () => {
        let url = "/accueil";
        history.push(url);
    };

    const [categoryList, setCategoryList] = useState(null);
    const [platformsList, setPlatformsList] = useState(null);
    const [currentGame, setCurrentGame] = useState(null);
    const url = window.location.href;
    const gameId = url.split("/").pop();

    useEffect(() => {
        if(!isAdmin) {
            onRedirect();
        }

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

        const getProduct = async () => {
            await fetch('https://127.0.0.1:8000/product/get/' + gameId , {
                method: 'Get',
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/ld+json"
                }
            })
            .then(response => response.json())
            .then(response => { 
                setCurrentGame(response)
            })
        }
    
        getCategories();
        getPlatforms();
        getProduct();
      }, []);
    
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) =>
        fetch("https://127.0.0.1:8000/product/update/" + gameId, {
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
            if(resp == "OK") {
                alert("Produit modifié !");
            } else {
                alert("Une erreur est survenue !");
            }
        });

    if(!categoryList || !platformsList || !currentGame) {
        return <div>Chargement...</div>;
    } else {
        return(
            <div>
                <div className="header_title">
                    <h2>Modifier un produit</h2>
                </div>
                <div className="container-card container-card--admin">

                    <form className="user-form admin-form" onSubmit={handleSubmit(onSubmit)}>
                        <h1>{currentGame.name}</h1>
            
                        <label htmlFor="category">Catégories :</label>
                        <select 
                            {...register("productCategory", {
                                required: "Veuillez choisir une catégorie",
                            })}
                            >
                            <option key={currentGame.categoryName}>{currentGame.categoryName}</option>
                            {categoryList.map(categorie => (
                                <option key={categorie.name} defaultValue={categorie.name}>{categorie.name}</option>
                            ))}
                        </select>
                        <ErrorMessage
                            errors={errors}
                            name="productCategory"
                            render={({ message }) => <p>{message}</p>}
                        />

                        <label htmlFor="" style={{paddingTop: 10}}>
                            Plateformes : 
                        </label>
                        <PlatformInputList currentGame={currentGame.platform} platformsList={platformsList} register={register} />
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
                            defaultValue={currentGame.published_at.date.split(" ").shift()}
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
                            defaultValue={currentGame.name}
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
                            defaultValue={currentGame.description} 
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
                            defaultValue={currentGame.price}
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
                            defaultValue={currentGame.picture}
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
                            defaultValue={currentGame.reduction}
                        />
                        <button type="submit">Modifier</button>
                    </form>
                </div>
            </div>
        )
    }
}


function PlatformInputList (props) {
    let platformsInputs = [];
    {props.platformsList.map(platform => (
        platformsInputs.push(<PlatformInput currentGamePlatforms={props.currentGame} platform={platform} register={props.register} />)
    ))}
    let platformList = "";
    { 
        for (let index = 0; index < props.currentGame.length; index++) {
            const element = props.currentGame[index];
            if(index !== (props.currentGame.length - 1)) {
                platformList += element + ' , '
            } else {
                platformList += element
            }
        }
    } 
    return <div>
        <strong>{platformList}</strong>
        <div className="platform_inputs_container">
            {platformsInputs}
        </div>
    </div>;
}

function PlatformInput(props) {
    let statement = false;
    for (let index = 0; index < props.currentGamePlatforms.length; index++) {
        const element = props.currentGamePlatforms[index];
        if(element == props.platform.name) {
            // let poeut; 
            statement = true;
        }
    }

    if(statement) {
        return <div>
            <label htmlFor={props.platform.name}>{props.platform.name}</label>
            <input 
                {...props.register("productPlatforms", {
                    required: "Veuillez choisir au moins une plateforme",
                })}
                type="checkbox" 
                key={props.platform.name} 
                id={props.platform.name}
                value={props.platform.name}
                defaultChecked
            />
        </div>;
    } else {
        return <div>
            <label htmlFor={props.platform.name}>{props.platform.name}</label>
            <input 
                {...props.register("productPlatforms", {
                    required: "Veuillez choisir au moins une plateforme",
                })}
                type="checkbox" 
                key={props.platform.name} 
                id={props.platform.name}
                value={props.platform.name}
            />
        </div>
    }
}

export default AdminGame
