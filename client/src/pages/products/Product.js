import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ApiClient } from "../../utils";

const Product = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await ApiClient(`products/${id}`);
        setProduct(product);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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
