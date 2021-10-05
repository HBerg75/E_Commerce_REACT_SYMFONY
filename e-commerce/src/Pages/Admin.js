import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/register.css";
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom";
import Product_create_form from "../components/Product_create_form";

export default function Admin({isAdmin}) {
  const [productList, setProductList] = useState(null);

  useEffect(() => {
    if(!isAdmin) {
      onRedirect();
    }
    const getProducts = async () => {
      await fetch("https://127.0.0.1:8000/tous_les_jeux", {
        method: "get",
        headers: {
          "Content-type": "application/json",
          "accept": "application/ld+json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setProductList(response)
        });
    };

    getProducts();
  }, []);

  const history = useHistory()  
  const onRedirect = () => {
      let url = "/login"
      history.push(url)
  }

    if (!productList) {
      return <div>Chargement...</div>;
    } else {
      return (
        <div>
          <div className="header_title">
            <h2>Admin</h2>
          </div>
          <div className="container-card container-card--admin">
            <Product_create_form />
            <ProductListing ProductList={productList} />
            </div>
          </div>
      );
    }
}

function ProductListing(props) {
  let ProductList = [];
  let linkToGame;
  let platformsString = "";
  props.ProductList.map((product) => (
    product.platform.forEach(element => {
      platformsString += " " + element.name;
    }),
    linkToGame = "/game/" + product.id,
    ProductList.push(
      <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>{product.reduction}</td>
        <td>{product.published_at.date}</td>
        <td>{product.categoryName}</td>
        <td>{platformsString}</td>
        <td><NavLink to={linkToGame} exact> éditer</NavLink></td>
        <td>
          <button onClick={() => fetch('https://127.0.0.1:8000/product/delete/' + product.id , {
                  method: 'Get',
                  headers: {
                      "Content-Type": "application/json",
                      "accept": "application/ld+json"
                  }
              })
              .then(response => response.json())
              .then(data => { 
                  alert('Produit supprimé !');
              })
          }> 
            Supprimer
          </button>
        </td>
      </tr>
    ),
    platformsString = ""
  ))

  return <table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Reduction (en %)</th>
            <th>Published_at</th>
            <th>Category</th>
            <th>Platforms</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    </thead>
    {ProductList}
  </table> 
}

