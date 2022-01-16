import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { ApiClient } from "../../utils";
import { Spin, Button, PageHeader, Descriptions } from "antd";
import { UserContext } from "../../App";

const Order = () => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  console.log("userInfo:::", userInfo);
  console.log("order:::", order);

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
      <PageHeader
        title={order.productName}
        subTitle={order.seller}
        extra={[
          userInfo.id === order.sellerId && (
            <Button type="primary" onClick={() => console.log("not yet")}>
              Edit
            </Button>
          ),
        ]}
      />
      <Descriptions title="Order Info" layout="vertical" bordered>
        <Descriptions.Item label="Order No.">{order.id}</Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item label="Price">{order.price}</Descriptions.Item>
        <Descriptions.Item label="Year">{order.year}</Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          {order.description}
        </Descriptions.Item>
      </Descriptions>
    </Spin>
  );
};

export default Order;
