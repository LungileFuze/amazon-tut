import React from "react";
import "./Product.css"
import { useStateValue } from "../context/StateProvider"

function Product({ id, title, image, price, rating }) {

  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
 
  return (
    <div className="product" key={id}>
      <div className="product__info">
      
        <p>{title}</p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>

        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
      <img src={image} alt="" />

      <button onClick={addToBasket} className="product-button">Add to Basket</button>
    </div>
  );
}

export default Product;