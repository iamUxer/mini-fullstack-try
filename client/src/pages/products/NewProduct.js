import React, { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserContext } from "../../App";
import { CSBasicButton } from "../../styled/StyledButtons";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const { TextArea, Search } = Input;

const NewProduct = () => {
  const navigate = useNavigate();
  const [userInfo] = useContext(UserContext);
  const [product, setProduct] = useState({
    productName: "",
    price: 0,
    year: 0,
  });

  const onChangeProduct = useCallback(
    (e) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
    },
    [product]
  );

  const onFinishHandle = useCallback(() => {
    fetch(`${SERVER_URL}/products/`, {
      method: "POST",
      body: JSON.stringify({
        ...product,
        sellerId: userInfo.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(`/products/${data.id}`);
      });
  }, [product, userInfo]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Form
      name="newproduct"
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
        label="Product Name"
        name="productName"
        rules={[{ required: true, message: "Please input the product name." }]}
      >
        <Input
          name="productName"
          value={product.productName}
          onChange={onChangeProduct}
        />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input the product price." }]}
      >
        <Input name="price" value={product.price} onChange={onChangeProduct} />
      </Form.Item>
      <Form.Item
        label="Produced Year"
        name="year"
        rules={[
          {
            required: true,
            message: "Please input produced year the product .",
          },
        ]}
      >
        <Input name="year" value={product.year} onChange={onChangeProduct} />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea
          autoSize={{ minRows: 2, maxRows: 6 }}
          value={product.description}
          onChange={onChangeProduct}
        />
      </Form.Item>
      <CSBasicButton
        float={"right"}
        type="primary"
        size="small"
        htmlType="submit"
      >
        Add
      </CSBasicButton>
    </Form>
  );
};

export default NewProduct;
