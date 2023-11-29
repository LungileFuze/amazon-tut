import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import axios from "./axios";
import { getBasketTotal } from "../context/reducer";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import "./Payment.css";
import { db } from "./firebase";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const emptyBasket = () => {
    dispatch({
      type: "EMPTY_BASKET"
    })
  }

  const navigate = useNavigate()

  const stripe = useStripe()
  const elements = useElements()

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(" ");

  useEffect(() => {
    //customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);


  console.log("The client secret is => ", clientSecret)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {card: elements.getElement(CardElement)}
    })
    .then(({ paymentIntent }) => {
      //Payment intent = payment confirmation
      db.collection("user")
      .doc(user?.id)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        basket: basket,
        amount: paymentIntent.amount,
        create: paymentIntent.created,
      })
      setSucceeded(true)
      setError(null)
      setProcessing(false)
      //Empty basket
      emptyBasket()
      //Redirect the user to order page
      navigate("/orders")
    })
  }

  const handleChange = (e) => {
    setDisabled(e.empty)
    setError(e.error ? "e.error.message" : "")
  }

  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout <Link to="/checkout">{basket?.length} items</Link>
        </h1>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>123 Firebase Road</p>
            <p>Durban Central, SA</p>
          </div>
        </div>

        <div className="payment-section">
          <div className="payment-title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment-items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                rating={item.rating}
                price={item.price}
              />
            ))}
          </div>
        </div>

        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment-details">
            {/* Stripe code here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>
              <div className="payment-price-container">
                <CurrencyFormat 
                renderText={(value) => <h3>Order Total:{value}</h3>}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p>: "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
