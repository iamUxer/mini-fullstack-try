import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const NewProduct = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    productName: "",
    price: 0,
    year: 0,
  });

  const handleValues = (e) => {
    const { productName, value } = e.target;
    setValues({ ...values, [productName]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    fetch(`${SERVER_URL}/products/`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/products/${data.id}`);
      });
  };

  return (
    <>
      <div>
        <span>Product Name</span>
        <input
          type="text"
          name="productName"
          value={values.productName}
          onChange={handleValues}
        />
      </div>
      <div>
        <span>Price</span>
        <input
          type="text"
          name="price"
          value={values.price}
          onChange={handleValues}
        />
      </div>
      <div>
        <span>year</span>
        <input
          type="text"
          name="year"
          value={values.year}
          onChange={handleValues}
        />
      </div>
      <button onClick={handleAdd}>add</button>
    </>
  );
};

export default NewProduct;
