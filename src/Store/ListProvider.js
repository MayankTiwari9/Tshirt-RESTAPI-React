// ListProvider.js

import React, { useReducer } from "react";
import ListContext from "./list-context";

const defaultListState = {
  items: [],
};

const listReducer = (state, action) => {
  if (action.type === "ADD_ITEM_TO_LIST") {
    const allItems = [...state.items, action.item];

    return {
      items: allItems,
    };
  }

  if (action.type === "DECREASE_ITEM_QUANTITY") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id && item.size === action.size
    );

    const existingItem = state.items[existingItemIndex];

    if (!existingItem) {
      return state;
    }

    const updatedItem = {
      ...existingItem,
      // Assuming the item has a property named `quantity`
      quantity: existingItem.quantity - 1,
    };

    const updatedItems = [...state.items];
    updatedItems[existingItemIndex] = updatedItem;

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
};

const ListProvider = (props) => {
  const [listState, dispatchListAction] = useReducer(
    listReducer,
    defaultListState
  );

  const addToListHandler = (item) => {
    dispatchListAction({ type: "ADD_ITEM_TO_LIST", item: item });
  };

  const decreaseItemQuantityHandler = (id, size) => {
    dispatchListAction({ type: "DECREASE_ITEM_QUANTITY", id: id, size: size });
  };

  const listContext = {
    items: listState.items,
    addListItem: addToListHandler,
    decreaseItemQuantity: decreaseItemQuantityHandler,
  };

  return (
    <ListContext.Provider value={listContext}>
      {props.children}
    </ListContext.Provider>
  );
};

export default ListProvider;
