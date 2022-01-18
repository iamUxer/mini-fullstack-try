import React, { useState, useContext, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Avatar } from "antd";
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

  console.log("searchProduct:::", searchProduct);

  console.log("newOrder:::", newOrder);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    onChangeOrder({ target: { name: "productName", value: searchProduct } });
    onChangeOrder({ target: { name: "price", value: newOrder.price } });
  }, [searchProduct]);

  const onSearchHandle = useCallback(() => {
    const fetchData = async () => {
      const products = await ApiClient("products");
      const existedProduct = products.find(
        (product) => product.productName === searchProduct
      );
      console.log("existedProduct:::", existedProduct);
      if (existedProduct) {
        setNewOrder({
          ...existedProduct,
        });
      } else {
        setNewOrder({
          ...newOrder,
          productName: searchProduct,
        });
      }
    };
    fetchData();
  }, [searchProduct, newOrder]);

  const onFinishHandle = useCallback(() => {
    fetch(`${SERVER_URL}/orders/new`, {
      method: "POST",
      body: JSON.stringify({
        sellerId: userInfo.id,
        ...newOrder,
        seller: userInfo.nickname,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/orders/${data.id}`);
      });
  }, [newOrder, userInfo]);

  const onChangeOrder = useCallback(
    (e) => {
      const { name, value } = e.target;
      setNewOrder({
        ...newOrder,
        [name]: value,
        productName: searchProduct,
      });
    },
    [newOrder, searchProduct]
  );
  console.log("???", newOrder);

  return (
    <Form
      name="neworder"
      labelCol={layout.labelCol}
      wrapperCol={layout.wrapperCol}
      onFinish={onFinishHandle}
    >
      <Avatar size="large" icon={<UserOutlined />} />
      <Form.Item>
        <span>{userInfo.nickname}</span>
      </Form.Item>
      <Form.Item
        label="Product Name"
        name="productName"
        rules={[{ required: true, message: "Please input the order name." }]}
      >
        <Search
          name="productName"
          placeholder="search product"
          onSearch={onSearchHandle}
          value={newOrder.productName}
          onChange={(e) => setSearchProduct(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input this order price." }]}
      >
        <Input name="price" value={newOrder.price} onChange={onChangeOrder} />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please input explane this product." },
        ]}
      >
        <TextArea
          name="description"
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
