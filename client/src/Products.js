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
  //1) useEffect는 렌더링이 됐을때 실행되고,
  //4) 리렌더링이 됐기 때문에, useEffect가 다시 실행됐다.

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        //2) 삭제된 data로 state가 업데이트됐을때 리렌더링이 되기때문에
        //3) 지금시점에서 product 업데이트가 일어나고 렌더링이 다시 된다음,
      });
  };
  console.log(products);
  //여기서 products는 왜 빈배열일까?

  return (
    <ul>
      {products.map((product) => {
        return (
          <div key={`${product.id}-${product.name}`}>
            <li key={`${product.id}-${product.name}`}>
              {product.name} : {product.price}
            </li>
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
