import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Spin } from "antd";
import { ApiClient } from "../../utils";
import { CSTable } from "../../styled/StyledTable";
import { CSBasicButton } from "../../styled/StyledButtons";

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
    {
      title: "Price",
      dataIndex: "price",
    },
  ];

  const dataSource = () => {
    const ordersList = orders.map((order) => {
      return {
        key: `${order.id}-${order.product}`,
        id: order.id,
        seller: order.seller,
        product: order.product,
        price: order.price,
      };
    });
    return ordersList;
  };

  const pagination = {
    pageSize: 5,
  };

  return (
    <Spin tip="Loading..." spinning={loading}>
      <CSBasicButton
        float={"right"}
        size="small"
        type="primary"
        onClick={() => navigate("/orders/new")}
      >
        New
      </CSBasicButton>
      <CSTable
        size="small"
        columns={columns}
        dataSource={dataSource()}
        onRow={(item) => {
          return {
            onClick: () => navigate(`/orders/${item.id}`),
          };
        }}
        pagination={pagination}
      />
    </Spin>
  );
};

export default Orders;
