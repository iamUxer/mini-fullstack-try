import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Order = () => {
  const [order, setOrder] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await fetch(`${SERVER_URL}/orders/${id}`);
        const order = await orderResponse.json();
        const productResponse = await fetch(
          `${SERVER_URL}/products/${order.productId}`
        );
        const product = await productResponse.json();
        const userResponse = await fetch(
          `${SERVER_URL}/users/${order.sellerId}`
        );
        const seller = await userResponse.json();
        const detailOrder = {
          id: order.id,
          product,
          seller,
        };
        setOrder(detailOrder);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div key={`${order.id}-${order.sellerId}`}>
      <div>Order Page</div>
      <div>Order No. {order.id}</div>
      <div>Seller : {order.seller?.nickname}</div>
      <div>Product : {order.product?.name}</div>
      <div>Price : {order.product?.price}</div>
      <div>Year : {order.product?.year}</div>
    </div>
  );
};

export default Order;
