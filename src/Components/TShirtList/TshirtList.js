import React, { useContext } from "react";
import ListContext from "../../Store/list-context";
import CartContext from "../../Store/cart-context";
import "./TshirtList.css";

function TshirtList(props) {
  const listCtx = useContext(ListContext);
  const cartCtx = useContext(CartContext);
  

  const addItemToCartHandler = async(item, size) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      amount: 1,
      size: size,
    };

    try{
      await fetch('https://crudcrud.com/api/ae7f3532c6a8498e8a497fd47cabea40/cart', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          ...cartItem
        })
      })
    } catch(err){
      console.log(err.message);
    }

    cartCtx.addItem(cartItem);
    listCtx.decreaseItemQuantity(item.id, size);
  };

  return (
    <div className="list-container">
      {props.products &&
        props.products.map((product) => {
          return (
            <div className="list-main" key={product.id}>
              <div>
                <h1>{product.name}</h1>
                <h1>{product.description}</h1>
                <h1>{product.price}</h1>
              </div>
              <div>
                <button onClick={() => addItemToCartHandler(product, "large")}>
                  Buy Large {product.large}
                </button>
                <button onClick={() => addItemToCartHandler(product, "medium")}>
                  Buy Medium {product.medium}
                </button>
                <button onClick={() => addItemToCartHandler(product, "small")}>
                  Buy Small {product.small}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default TshirtList;
