import React from "react";
import { useState, useEffect } from "react";

//mock data
const products = [
  {
    name: "diablo",
    price: 30000,
    year: 2001,
  },
  {
    name: "starcraft",
    price: 40000,
    year: 2001,
  },
];

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
    console.log(products);
  }, []);

  return (
    <ul>
      {products.map((product) => {
        return <li key={`${product.id}-${product.name}`}>{product.name}</li>;
      })}
    </ul>
  );
}

export default Products;
