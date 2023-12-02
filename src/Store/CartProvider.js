import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id && item.size === action.item.size
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "DECREASE_ITEM_QUANTITY") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id && item.size === action.size
    );

    const existingCartItem = state.items[existingCartItemIndex];

    if (!existingCartItem) {
      return state;
    }

    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(
        (item) => item.id !== action.id || item.size !== action.size
      );
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: state.totalAmount - existingCartItem.price,
    };
  }

  if(action.type === "PLACE_ORDER"){
    return {
      items: [],
      totalAmount: 0
    }
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const decreaseItemQuantityHandler = (id, size) => {
    dispatchCartAction({ type: "DECREASE_ITEM_QUANTITY", id: id, size: size });
  };

  const placeOrderHandler = () => {
    dispatchCartAction({type: "PLACE_ORDER"})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addToCartHandler,
    removeItem: decreaseItemQuantityHandler,
    placeItem: placeOrderHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
