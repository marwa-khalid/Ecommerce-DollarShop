
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/CartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from 'axios';
import {useParams} from 'react-router-dom';

const PaymentForm = ()=> {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const [paymentMethod, setPaymentMethod] = useState("card"); // Default to "Card"
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);
  const {fullAddress} = useParams();
  
  console.log(  
    cart.cartItems
   
  )
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    // Determine the payment method based on the selected radio button
   // Determine the payment method based on the selected radio button
if (paymentMethod === "card") {
  try {
    // Handle card payment

    // Regardless of the payment result, attempt to post the order
    const orderData = {
      email: user.email,
      products: cart.cartItems.map(item => ({
        title: item.title,
        quantity: item.cartQuantity,
        image: item.image,
        productId: item._id,
      })),
      totalPrice: cart.cartItems.reduce(
        (total, item) => total + item.price * item.cartQuantity,
        0
      ),
      address: fullAddress,
      status: "processing",
      paymentMethod: "card",
    };

    axios.post('https://dollar-wala-server.vercel.app/api/orders', orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {

      window.alert("Your order has been placed!");
    
      dispatch(clearCart());
      navigate('../../cart');
      const { error } = stripe.confirmPayment();
  
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    })
    .catch(error => {
      // Handle errors that may occur during the order posting
      console.log("Error posting order: ", error);
    });

  } catch (stripeError) {
    // Handle errors that may occur during the Stripe payment confirmation
    console.log("Stripe payment error: ", stripeError);
    setMessage("An error occurred during payment.");
  }
}
else if (paymentMethod === "cash") {
      

      const orderData = {
        email: user.email,
        products: cart.cartItems.map(item => ({
          title: item.title,
          quantity: item.cartQuantity,
          image: item.image,
          productId: item._id
        })),
        totalPrice: cart.cartItems.reduce(
          (total, item) => total + item.price * item.cartQuantity,
          0
        ),
        address: fullAddress,
        status:"processing",
        paymentMethod:"cash"
      };

      axios.post('https://dollar-wala-server.vercel.app/api/orders', orderData)
      .then(response => {
        setMessage("Order Placed");
        dispatch(clearCart())
        navigate('../../cart');
        window.alert("Your order has been placed!");
      })
      .catch(error => {
        console.log(error)
      });
    }

    setIsProcessing(false);
  };

  // Function to handle radio button change
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  let buttonText = "Pay now";
  if (paymentMethod === "cash") {
    buttonText = "Place Order"; // Change button text for Cash on Delivery
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* Radio buttons to select payment method */}
      <div >
        <label className="mx-5">
          <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            onChange={handlePaymentMethodChange}
          />
          Card
        </label>
        <label className="mx-5">
          <input
            type="radio"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={handlePaymentMethodChange}
          />
          Cash on Delivery
        </label>
      </div>

      {paymentMethod === "card" && <PaymentElement id="payment-element" />}

      <button className="container d-flex w-50" disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : buttonText}
        </span>
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default PaymentForm;