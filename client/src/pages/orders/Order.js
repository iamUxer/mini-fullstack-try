import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ApiClient } from "../../utils";
import { Spin, Button } from "antd";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Order = () => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const order = await ApiClient(`orders/${id}`);
        setOrder(order);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Spin tip="Loading..." spinning={loading}>
      <div key={`${order.id}-${order.sellerId}`}>
        <div>Order Page</div>
        <div>Order No. {order.id}</div>
        <div>Seller : {order.seller?.nickname}</div>
        <div>Product : {order.product?.name}</div>
        <div>Price : {order.product?.price}</div>
        <div>Year : {order.product?.year}</div>
      </div>
      <Button onClick={() => console.log("not yet")}>Edit</Button>
    </Spin>
  );
};

export default Order;
