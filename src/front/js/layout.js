import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import "../styles/home.css";
import "../styles/footer.css";
import wpp from "../img/whatsapp_logo-2x.png"
import { Context } from "./store/appContext";


import { Home } from "./pages/home.jsx";
import injectContext from "./store/appContext";
import { ProductDetail } from "./pages/details.jsx";
import { Login } from "./pages/login.jsx";
import { SignUp } from "./pages/signup.jsx";
import { Favorites } from "./pages/favorites.jsx";
import { Profile } from "./pages/profile.jsx";
import { Carrito } from "./pages/carrito.jsx";
import { ContactUs } from "./pages/contactus.jsx";
import { SubirImagenes } from "./pages/images.jsx";
import { Checkout } from "./pages/checkout.jsx";
import { ChangePassword } from "./pages/changePassword.jsx";

import { NavbarPrincipal } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";

// create your first component
const Layout = () => {
  // the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";
  const { store, actions } = useContext(Context);

  const buttonWPP = () => {
    let la = "https://wa.me/+598091957050?text=Quisiera comprar estos productos"

    for (let i = 0; i < store.shoppingList.length; i++) {
      la = la + "%0A " + store.shoppingList[i]?.name + "      Cantidad: " // agregar cantidad de pañales
    }
    window.open(la, "_blank")
  }


  return (
    <div id="layout">
      {" "}
      <BrowserRouter basename={basename}>
        {" "}
        <ScrollToTop>
          {" "}
          <NavbarPrincipal />{" "}
          <Routes>
            {" "}
            <Route element={<Home />} path="/" />{" "}
            <Route element={<Login />} path="/login" />{" "}
            <Route element={<SignUp />} path="/signup" />{" "}
            <Route element={<ContactUs />} path="/contactus" />{" "}
            <Route element={<Favorites />} path="/favorites" />{" "}
            <Route element={<Carrito />} path="/carrito" />{" "}
            <Route element={<Checkout />} path="/checkout" />{" "}
            <Route element={<ChangePassword />} path="/changePassword" />{" "}
            <Route element={<ProductDetail />} path="/product-detail/:id" />{" "}
            <Route element={<Profile />} path="/profile" />{" "}
            <Route element={<SubirImagenes />} path="/upload-img" />{" "}
            <Route element={<h1> Not found! </h1>} />{" "}
          </Routes>{" "}
          <img onClick={buttonWPP} id="whatsapp" src={wpp} style={{ maxWidth: "6rem", cursor: "pointer" }} />

          <Footer />{" "}
        </ScrollToTop>{" "}
      </BrowserRouter>{" "}
    </div>
  );
};

export default injectContext(Layout);
