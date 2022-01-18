import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { Spin, PageHeader, Descriptions } from "antd";
import { ApiClient } from "../../utils";
import { UserContext } from "../../App";
import { CSBasicButton } from "../../styled/StyledButtons";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Product = () => {
  const { id } = useParams();
  const [userInfo] = useContext(UserContext);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await ApiClient(`products/${id}`);
        const { nickname } = await ApiClient(`users/${product.sellerId}`);
        setProduct({
          ...product,
          seller: nickname,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  //1) useEffect는 마지막 array 옵션이 비어있을때, 첫 렌더링이 됐을때 최초 한번만 실행되고,
  //4) 리렌더링이 됐지만 useEffect가 다시 실행되지는 않는다.

  const handleDelete = (id) => {
    fetch(`${SERVER_URL}/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        //2) 삭제된 data로 state가 업데이트됐을때 리렌더링이 되기때문에
        //3) 지금시점에서 product 업데이트가 일어나고 렌더링이 다시 된다음,
        navigate(`/products`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Spin tip="Loading..." spinning={loading}>
      <PageHeader
        title={product.productName}
        subTitle={product.seller}
        extra={[
          userInfo.id === product.sellerId && (
            <>
              <CSBasicButton
                size="small"
                onClick={() => navigate(`/products/${product.id}/edit`)}
              >
                Edit
              </CSBasicButton>
              <CSBasicButton
                size="small"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </CSBasicButton>
            </>
          ),
        ]}
      />
      <Descriptions title="Product Info" layout="vertical" bordered>
        <Descriptions.Item label="Product Name">
          {product.productName}
        </Descriptions.Item>
        <Descriptions.Item label="Seller">{product.seller}</Descriptions.Item>
        <Descriptions.Item label="Price">{product.price}</Descriptions.Item>
        <Descriptions.Item label="Year">{product.year}</Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          {product.description}
        </Descriptions.Item>
      </Descriptions>
    </Spin>
  );
};

export default Product;
