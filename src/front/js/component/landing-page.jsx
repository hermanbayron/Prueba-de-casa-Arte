import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const LandingPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="card-group mb-5 mt-5">
      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {store.product.length > 0 ? (
          store.product.map((item, id) => (
            <Card
              className="m-3"
              key={id}
              style={{ width: "18rem", background: "#212529", margin: "auto" }}
            >
              <Link style={{textDecoration: "none"}} to={"/product-detail/" + (id + 1)}>
                <Card.Body>
                  <img
                    src={item.url}
                    className="img-fluid rounded p-1"
                    alt="..."
                    style={{maxHeight: "12rem"}}
                  />
                  <div style={{textAlign: "left", marginLeft: "25px"}}>
                  <Card.Title style={{color: "#bdb284", textDecoration: "none"}}>Name: {item.name}</Card.Title>
                  <Card.Text style={{color: "#bdb284"}}>Category: {item.category}</Card.Text>
                  <Card.Text style={{color: "#bdb284"}}>Price: U$S {item.price}</Card.Text>
                  </div>
                  </Card.Body>
                  </Link>
                  <Card.Body>
                  <div className="d-flex align-bottom justify-content-between ">
                    {/* <div className="col-6 d-flex justify-content-between">
                    <Link
                      to={"/product-detail/" + (id + 1)}
                      className="btn btn-primary"
                    >
                      Leer mas...
                    </Link>
                  </div> */}
                    
                      <button
                        type="button"
                        onClick={() => actions.addProducts(item.name)}
                        className="btn btn-outline-light d-flex align-bottom"
                        style={{ float: "right", color: "#bdb284"}}
                      >
                        <i className="fa fa-cart-plus"></i>
                      </button>
                    
                    
                      <Link to="/" className="btn btn-outline-light align-bottom" style={{color: "#bdb284"}}>
                        <i
                          className="far fa-heart"
                          onClick={() => { actions.createFavorite(item.id) }}
                        ></i>
                      </Link>
                   
                  </div>
                </Card.Body>
             

            </Card>
          ))) : (<p>No hay cartas</p>)}
      </div>
    </div>
  );
};
