import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import { auth } from "./components/firebase";
import { useStateValue } from "./context/StateProvider";
import Checkout from "./components/Checkout";
import Delivery from "./components/Delivery";
import Deals from "./components/mainNav/Deals";
import CustomerService from "./components/mainNav/CustomerService";
import Registry from "./components/mainNav/Registry";
import GiftCards from "./components/mainNav/GiftCards";
import Sell from "./components/mainNav/Sell";
import Sidebar from "./components/mainNav/Sidebar";
import NotFound from "./components/NotFound";
import Payment from "./components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const promise = loadStripe(
  'pk_test_51OEtllBeRvVznJ2kxfmgZ7lZsuA8Lt9HblNdUYhzGgHYFbhxngVXbZJNDt7Zz5gKvY6ECmnxVJUFiaKBZT3nknj600a2mwpoPL'
);

const App = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Home />} />

          <Route path="/checkout" element={<Checkout />} />

          
          <Route path="/payment" element={<Elements stripe={promise}>
          <Payment />
          </Elements> } />

          <Route path="/location" element={<Delivery />} />

          <Route path="/deals" element={<Deals />} />

          <Route path="/customerService" element={<CustomerService />} />

          <Route path="/registry" element={<Registry />} />

          <Route path="/giftCards" element={<GiftCards />} />

          <Route path="/sell" element={<Sell />} />

          <Route path="/sidebar" element={<Sidebar />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
