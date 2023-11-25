import React from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NavBar from "./Components/NavBar";
import Product from "./Components/Product";
import { Routes, Route } from "react-router-dom";
import SingleProduct from "./Components/SingleProduct";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Cart from "./Components/Cart";
import Franchise from "./Pages/franchise";
import ShippingForm from "./Components/ShippingForm";
import Payment from "./Pages/Payment";
import OrderScreen from "./Components/OrderScreen";
import ResetPasswordForm from "./reset/ResetForm";
import AutheticateForm from "./Authenticate/AuthenticateForm";
import ConfirmReset from "./reset/ConfirmReset";
import Footer from "./Components/Footer";
import ShopReviews from "./Pages/ShopReviews";

const App = () => {

  return (
      <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/product" element={<Product/>} />
        <Route exact path="/products/:id" element={<SingleProduct/>} />
        <Route exact path="/login" element={<Login/>} />   
        <Route exact path="/Register" element={<Register/>} />  
        <Route exact path="/Cart" element={<Cart/>} />   
        <Route exact path="/Contact" element={<Contact/>} />
        <Route exact path="/About" element={<About/>}/>
        <Route exact path="/cart/ShippingForm" element={<ShippingForm/>} />
        <Route exact path="/Franchise" element={<Franchise/>}/>
        <Route exact path="/cart/ShippingForm/Payment/:fullAddress" element={<Payment/>}/>
        <Route exact path="/orders" element={<OrderScreen/>}/>
        <Route exact path="/login/reset" element={<ResetPasswordForm/>}/>
        <Route exact path="/login/reset/Confirm/:email" element={<ConfirmReset/>}/>
        <Route exact path="/Reviews" element={<ShopReviews/>}/>
        <Route exact path="/Register/Authenticate/:token/:expirationDate" element={<AutheticateForm/>}/>
      </Routes>   
      <Footer />   
    </>
  );
  }
;

export default App;