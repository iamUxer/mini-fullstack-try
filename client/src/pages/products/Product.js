import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Product = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${SERVER_URL}/products/${id}`)
      .then((res) => res.json())
      //fetch API의 응답(response) 객체는json()를 제공하고 있어JSON.parse() 대신 사용할 수 있다.
      //response.json()메서드를 호출하면 JSON 데이터를 javascript 객체로 변환한다.
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <div key={`${product.id}-${product.name}`}>
        <div> {product.name} </div>
        <div> {product.price} </div>
        <div> {product.year} </div>
      </div>
      <button onClick={() => navigate("/products")}>List</button>
    </>
  );
};

export default Product;
