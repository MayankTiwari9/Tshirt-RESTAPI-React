import React, { useContext } from "react";
import "./Header.css";
import CartContext from "../../Store/cart-context";

const Header = (props) => {
  
  const cartCtx = useContext(CartContext);

  const oncCartOpenHandler = () => {
    props.setCartOpen(true);
  };

  return (
    <>
      <div className="header">
        <h1>T-Shirts</h1>
        <button onClick={oncCartOpenHandler}>Cart {props.cartCount}</button>
      </div>
    </>
  );
};

export default Header;
