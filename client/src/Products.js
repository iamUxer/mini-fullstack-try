import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        navigate(`/products`);
      });
  };
  console.log(products);
  //여기서 products는 왜 빈배열일까?

  return (
    <ul>
      {products.map((product) => {
        return (
          <div key={`${product.id}-${product.name}`}>
            <li key={`${product.id}-${product.name}`}>{product.name}</li>
            <button onClick={() => navigate(`/products/${product.id}/edit`)}>
              edit
            </button>
            <button onClick={() => handleDelete(product.id)}>delete</button>
          </div>
        );
      })}
    </ul>
  );
}

export default Products;
