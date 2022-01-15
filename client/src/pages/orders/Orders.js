import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Spin, Table } from "antd";
import { ApiClient } from "../../utils";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await ApiClient(`orders`);
        setOrders(orders);
        setLoading(false);
      } catch (error) {
        console.log("error :", error);
      }
    };
    fetchData();
  }, []);

  console.log(orders);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Seller",
      dataIndex: "seller",
    },
    {
      title: "Product",
      dataIndex: "product",
    },
  ];

  return (
    <Spin tip="Loading..." spinning={loading}>
      <Table
        size="small"
        columns={columns}
        dataSource={orders.map((order) => {
          return {
            id: order.id,
            seller: order.seller?.nickname,
            product: order.product?.name,
          };
        })}
        onRow={(item) => {
          return {
            onClick: () => navigate(`/orders/${item.id}`),
          };
        }}
      />
    </Spin>
  );
};

export default Orders;
