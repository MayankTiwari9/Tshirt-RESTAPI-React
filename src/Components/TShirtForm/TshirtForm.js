import React, { useContext, useState } from "react";
import ListContext from "../../Store/list-context";
import "./TshirtForm.css";

const TshirtForm = (props) => {
  const listContext = useContext(ListContext);

  const [shoeData, setShoeData] = useState({
    name: "",
    description: "",
    price: "",
    large: "",
    medium: "",
    small: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setShoeData((prevData) => ({ ...prevData, [id]: value }));
  };

  const addListItemHandler = async() => {
    const newItem = {
      id: Math.random(),
      name: shoeData.name,
      description: shoeData.description,
      price: shoeData.price,
      large: shoeData.large,
      medium: shoeData.medium,
      small: shoeData.small,
    };

    try{
      await fetch('https://crudcrud.com/api/ae7f3532c6a8498e8a497fd47cabea40/products', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          ...newItem
        })
      })
      props.getHandlder();

    } catch(err){
      console.log(err.message);
    }

    listContext.addListItem(newItem);

    setShoeData({
      name: "",
      description: "",
      price: "",
      large: "",
      medium: "",
      small: "",
    });
  };

  return (
    <div className="shoeform-main">
      <div>
        <div>
          <label>Shoe Name</label>
          <input
            type="text"
            id="name"
            value={shoeData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            id="description"
            value={shoeData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            id="price"
            value={shoeData.price}
            onChange={handleChange}
          />
        </div>
      </div>
        <h2>Quantity Available</h2>
      <div>
        <div>
          <label>Large</label>
          <input
            type="number"
            id="large"
            value={shoeData.large}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Medium</label>
          <input
            type="number"
            id="medium"
            value={shoeData.medium}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Small</label>
          <input
            type="number"
            id="small"
            value={shoeData.small}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <button className="add-btn" onClick={addListItemHandler}>Add Product</button>
      </div>
    </div>
  );
};

export default TshirtForm;
