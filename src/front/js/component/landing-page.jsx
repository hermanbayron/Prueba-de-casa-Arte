import React, { Component } from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const LandingPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      {store.product.map((item, id) => (
        <Card key={id} style={{ width: "18rem" }}>
          <Card.Body>
            <img
              src={
                "https://uruguayeduca.anep.edu.uy/sites/default/files/2018-05/Imagen%20del%20recurso_0.jpg"
              }
              className="img-fluid"
              alt="..."
            />
            <Card.Title> {item.name}</Card.Title>
            <Card.Text> {item.category}</Card.Text>
            <Card.Text> {item.price}</Card.Text>
            <Link
              to={"/product-detail/" + (id + 1)}
              className="btn btn-primary"
            >
              Leer mas...
            </Link>
            <button
              type="button"
              onClick={() => actions.getProducts(item.name)}
              class="btn btn-primary mx-1"
            >
              Comprar ahora
            </button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
