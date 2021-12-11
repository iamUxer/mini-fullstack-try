import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    price: 0,
    year: 0,
  });
  useEffect(() => {
    fetch(`http://localhost:8080/products/${id}`)
      .then((res) => res.json())
      .then((data) => setValues(data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleEditValue = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleApply = (e) => {
    fetch(`http://localhost:8080/products/${id}`, {
      method: "PUT",
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
        <span>name: </span>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleEditValue}
        />
      </div>
      <div>
        <span>price: </span>
        <input
          type="text"
          name="price"
          value={values.price}
          onChange={handleEditValue}
        />
      </div>
      <div>
        <span>year: </span>
        <input
          type="text"
          name="year"
          value={values.year}
          onChange={handleEditValue}
        />
      </div>
      <button onClick={handleApply}>apply</button>
    </>
  );
};

export default EditProduct;
