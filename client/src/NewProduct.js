import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    price: 0,
    year: 0,
  });

  const handleValues = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/products/", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        navigate(`/products/${data.id}`);
      });
  };

  return (
    <>
      <div>
        <span>name</span>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleValues}
        />
      </div>
      <div>
        <span>price</span>
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
