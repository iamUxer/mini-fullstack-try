import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${SERVER_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);
  //1) useEffect는 첫 렌더링이 됐을때 최초 한번만 실행되고,
  //4) 리렌더링이 됐지만 useEffect가 다시 실행되지는 않는다.

  const handleDelete = (id) => {
    fetch(`${SERVER_URL}/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        //2) 삭제된 data로 state가 업데이트됐을때 리렌더링이 되기때문에
        //3) 지금시점에서 product 업데이트가 일어나고 렌더링이 다시 된다음,
      });
  };

  return (
    <div>
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
      <button onClick={() => navigate("/products/new")}>new</button>
    </div>
  );
}

export default Products;
