import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../Store/cart-context";
import Modal from "../UI/Modal";
import "./Cart.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  console.log(cartCtx);

  useEffect(() => {
    fetchingCartData();
  },[])

  const fetchingCartData = async() => {
    try{
      const res = await fetch("https://crudcrud.com/api/ae7f3532c6a8498e8a497fd47cabea40/cart");
      const data = await res.json();
      setCartItems(data);
    }
    catch(err) {
      console.log(err);
    }
  }

  const onCartHandler = () => {
    props.setCartOpen(false);
  };

  const onPlcaeOrderHandler = () => {
    cartCtx.placeItem();
  }

  const consolidatedItems = cartItems.reduce((acc, item) => {
    const key = `${item.id}-${item.name}`;

    if (!acc[key]) {
      acc[key] = { ...item, sizes: { [item.size]: item.amount } };
    } else {
      if (!acc[key].sizes[item.size]) {
        acc[key].sizes[item.size] = item.amount;
      } else {
        acc[key].sizes[item.size] += item.amount;
      }

      acc[key].amount += item.amount;
    }

    return acc;
  }, {});

  const cartItemDetails = Object.values(consolidatedItems).map((item) => (
    <div key={`${item.id}-${item.name}`}>
      <h1>{item.name}</h1>
      {Object.entries(item.sizes).map(([size, quantity]) => (
        <span key={size}>
          {size} ({quantity}),{" "}
        </span>
      ))}
      <br />
    </div>
  ));

  return (
    <Modal>
      <div className="cart-items">
        {cartItemDetails}
        <h3>Total: {cartCtx.totalAmount}</h3>
        <button onClick={onCartHandler}>Close </button>
        <button onClick={onPlcaeOrderHandler}>Place Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
