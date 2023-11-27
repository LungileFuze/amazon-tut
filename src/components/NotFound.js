import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <Link to="/" className="custom-link">
        <div>
          <img
            className="top-img "
            src="https://images-na.ssl-images-amazon.com/images/G/01/error/title._TTD_.png"
            alt=""
          />
        </div>
        <div>
          <img
            className="bottom-img"
            src="https://images-na.ssl-images-amazon.com/images/G/01/error/121._TTD_.jpg"
            alt=""
          />
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
