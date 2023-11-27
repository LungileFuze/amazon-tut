import React from "react";
import "./Header.css";
import { SearchRounded } from "@mui/icons-material";
import { ShoppingCartCheckoutTwoTone } from "@mui/icons-material";
import { useStateValue } from "../context/StateProvider";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { Menu } from "@mui/icons-material";
import { LocationOnOutlined } from "@mui/icons-material";


function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <>
        <div className="header">
        <Link to="/">
          <img
            className="header__logo"
            src="https://wildfiresocial.com/wp-content/uploads/2019/01/amazon-logo-white._cb1509666198_.png"
            alt=""
          />
        </Link>

        <Link to="/location" className="custom-links">
            <div className="header__option">
              <span className="header__optionLineOne">
              <LocationOnOutlined className="menuIcon"/>
              Deliver to</span>
              <span className="header__optionLineTwo">South Africa</span>
            
          </div>
        </Link>


        <div className="header__search">
          <input className="header__searchInput" type="text" placeholder="Search Amazon"/>
          <SearchRounded className="header__searchIcon" />
        </div>

        <div className="languages">
          <img
            src="https://th.bing.com/th/id/OIP.769HmP7cJQYr9aylnF3x-wAAAA?pid=ImgDet&w=400&h=210&rs=1"
            alt="USA Flag"
          />
          <span className="header__optionLineTwo language">US</span>
        </div>

        <div className="header__nav">
          <Link to={!user && "/login"}>
            <div onClick={handleAuthenticaton} className="header__option">
              <span className="header__optionLineOne">
                Hello {!user ? "Guest" : user.email}
              </span>
              <span className="header__optionLineTwo">
                {user ? "Sign Out" : "Sign In"}
              </span>
            </div>
          </Link>

          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>

          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>

          <Link to="checkout">
            <div className="header__optionBasket">
              <ShoppingCartCheckoutTwoTone />
              <span className="header__optionLineTwo header__basketCount">
                {basket?.length}
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className="main-nav">
        <Link to="/sidebar" className="custom-links">
          <div className="sideMenu">
          
          <span>
          <Menu className="menuIcon"/>All</span>
          </div>
        </Link>

        <Link to="/deals" className="custom-links">
          <span>Today's Deals</span>
        </Link>

        <Link to="/customerService" className="custom-links">
          <span>Customer Service</span>
        </Link>

        <Link to="/registry" className="custom-links">
          <span>Registry</span>
        </Link>

        <Link to="/giftCards" className="custom-links">
          <span>Gift Cards</span>
        </Link>

        <Link to="/sell" className="custom-links">
          <span>Sell</span>
        </Link>
        </div>
    </>
  );
}

export default Header;
