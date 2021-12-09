import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

const Product = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  console.log(product);

  useEffect(() => {
    fetch(`http://localhost:8080/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div key={`${product.id}-${product.name}`}>
      <div> {product.name} </div>
      <div> {product.price} </div>
      <div> {product.year} </div>
    </div>
  );
};

export default Product;
