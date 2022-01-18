import React, { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Form, Input, PageHeader, Descriptions } from "antd";
import { UserContext } from "../../App";
import { ApiClient } from "../../utils";
import { CSBasicButton, CSWrapButton } from "../../styled/StyledButtons";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const { TextArea } = Input;

const EditProduct = () => {
  const { id } = useParams();
  const [userInfo] = useContext(UserContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    year: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await ApiClient(`products/${id}`);
        setProduct({
          ...product,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleEditValue = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
      price: Number(value),
    });
  };

  const onFinishHandle = useCallback(() => {
    fetch(`${SERVER_URL}/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        navigate(`/products/${data.id}`);
      });
  });
  return (
    <>
      <PageHeader title={product.productName} subTitle={userInfo.nickname} />
      <Form
        name="editproduct"
        initialValues={{ remember: true }}
        onFinish={onFinishHandle}
        autoComplete="off"
      >
        <Descriptions title="Product Info" layout="vertical" bordered>
          <Descriptions.Item label="Product Name">
            <Form.Item
              rules={[
                { required: true, message: "Please input the product name." },
              ]}
            >
              <Input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleEditValue}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            <Form.Item
              rules={[
                { required: true, message: "Please input the product price." },
              ]}
            >
              <Input
                type="text"
                name="price"
                value={product.price}
                onChange={handleEditValue}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Produced Year">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input produced year the product .",
                },
              ]}
            >
              <Input
                type="text"
                name="year"
                value={product.year}
                onChange={handleEditValue}
              />
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={2}>
            <Form.Item>
              <TextArea
                placeholder="Autosize height with minimum and maximum number of lines"
                autoSize={{ minRows: 2, maxRows: 6 }}
                name="description"
                value={product.description}
                onChange={handleEditValue}
              />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>
        <CSWrapButton align={"flex-end"}>
          <CSBasicButton
            size="small"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            Cancel
          </CSBasicButton>
          <CSBasicButton type="primary" size="small" htmlType="submit">
            Apply
          </CSBasicButton>
        </CSWrapButton>
      </Form>
    </>
  );
};

export default EditProduct;
