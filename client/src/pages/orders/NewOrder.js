import React, { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../../App";
import { ApiClient } from "../../utils";
import { CSBasicButton } from "../../styled/StyledButtons";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const { TextArea, Search } = Input;

const NewOrder = () => {
  const navigate = useNavigate();
  const [userInfo] = useContext(UserContext);
  const [searchProduct, setSearchProduct] = useState("");
  const [newOrder, setNewOrder] = useState({});

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onSearchHandle = useCallback(
    (e) => {
      const fetchData = async () => {
        const products = await ApiClient("products");
        const existedProduct = products.find(
          (product) => product.name === searchProduct
        );
        console.log(existedProduct);
        if (existedProduct) {
          setNewOrder({
            ...existedProduct,
          });
        } else {
          setNewOrder({
            ...newOrder,
            productName: e.target.value,
          });
        }
      };
      fetchData();
    },
    [searchProduct, newOrder]
  );

  const onFinishHandle = useCallback(() => {
    fetch(`${SERVER_URL}/orders/new`, {
      method: "POST",
      body: JSON.stringify({
        ...newOrder,
        seller: userInfo.nickname,
        sellerId: userInfo.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/orders/${data.id}`);
      });
  }, []);

  const onChangeOrder = useCallback(
    (e) => {
      const { name, value } = e.target;
      setNewOrder({
        ...newOrder,
        [name]: value,
      });
    },
    [newOrder]
  );

  return (
    <Form
      name="neworder"
      labelCol={layout.labelCol}
      wrapperCol={layout.wrapperCol}
      initialValues={{ remember: true }}
      onFinish={onFinishHandle}
      autoComplete="off"
    >
      <Avatar size="large" icon={<UserOutlined />} />
      <Form.Item>
        <span>{userInfo.nickname}</span>
      </Form.Item>
      <Form.Item
        label="Product"
        name="product"
        rules={[{ required: true, message: "Please input the order name." }]}
      >
        <Search
          placeholder="search product"
          onSearch={onSearchHandle}
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input this order price." }]}
      >
        <Input value={newOrder.price} onChange={onChangeOrder} />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please input explane this product." },
        ]}
      >
        <TextArea
          autoSize={{ minRows: 2, maxRows: 6 }}
          value={newOrder.description}
          onChange={onChangeOrder}
        />
      </Form.Item>
      <CSBasicButton
        float={"right"}
        size="small"
        type="primary"
        htmlType="submit"
      >
        Submit
      </CSBasicButton>
    </Form>
  );
};

export default NewOrder;
