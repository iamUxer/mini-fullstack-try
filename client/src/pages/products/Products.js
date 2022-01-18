import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { ApiClient } from "../../utils";
import { CSTable } from "../../styled/StyledTable";
import { CSBasicButton } from "../../styled/StyledButtons";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await ApiClient(`products`);
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];

  const dataSource = () => {
    const productsList = products.map((product) => {
      return {
        key: `${product.id}-${product.productName}`,
        id: product.id,
        productName: product.productName,
        price: product.price,
      };
    });
    return productsList;
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
        onClick={() => navigate("/products/new")}
      >
        New
      </CSBasicButton>
      <CSTable
        size="small"
        pagination={pagination}
        columns={columns}
        dataSource={dataSource()}
        onRow={(item) => {
          return {
            onClick: () => navigate(`/products/${item.id}`),
          };
        }}
      />
    </Spin>
  );
}

export default Products;
