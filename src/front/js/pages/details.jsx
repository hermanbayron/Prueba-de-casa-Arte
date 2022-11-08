import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";

export const ProductDetail = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    actions.getProductDetail(params.id);
  }, []);

  return (
    <div className="vh-100 container mt-5">
      <div
        className="d-flex justify-content-center"
        // col-9 central-content ESTO LO QUITE, ME PARECIO MEJOR
      >
        <Carousel variant="dark">
          {store.product.map((item) => (
            <Carousel.Item className="" key={item.id}>
              <div className="row">
                <div className="col-5">
                  <Card style={{ width: "18rem", height: "400px" }}>
                    <Card.Img variant="top" src={item?.url} />
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-center">
                        {item?.name}
                      </Card.Title>
                      <Card.Text>Price $</Card.Text>
                      <Button
                        onClick={() => actions.addProducts(item.name)}
                        variant="primary"
                        className="btn btn-dark"
                        style={{ color: "#bdb284" }}
                      >
                        Add to cart
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-7">
                  <Card style={{ width: "18rem", height: "400px" }}>
                    <Card.Body>
                      <Card.Title>{item?.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {item?.category}
                      </Card.Subtitle>
                      <Card.Text>{item?.description}</Card.Text>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Price: $ {item?.price}</Card.Link>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div className="input-container">
                <form action="">
                  <Form.Label>Comment</Form.Label>
                  <div className="row">
                    <Form.Control
                      type="text"
                      placeholder="Leave your comments here please"
                    />
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn btn-warning text-dark"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="col-3 nav"></div>
      <div className="col-9 comments"></div>
    </div>
  );
};
