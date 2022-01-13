import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { Menu, Row, Col, Button } from "antd";
import { HomeFilled, AppstoreFilled, DropboxOutlined } from "@ant-design/icons";

import Login from "../auth/Login";
import Logout from "../auth/Logout";
import Signup from "../auth/Signup";
import { UserContext } from "../../App";

const { SubMenu } = Menu;

const StyledNavigationBar = styled.div`
  & .ant-col-10 {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
    border-bottom: 1px solid #f0f0f0;
    & button {
      margin-left: 10px;
    }
  }
`;

const NavigationBar = () => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [current, setCurrent] = useState("Dashboard");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <StyledNavigationBar>
      <Row>
        <Col span={14}>
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
          >
            <Menu.Item key="Dashboard" icon={<HomeFilled />}>
              <Link to="/dashboard">
                <a>Dashboard</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="Products" icon={<AppstoreFilled />}>
              <Link to="/products">
                <a>Products</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="Orders" icon={<DropboxOutlined />}>
              <Link to="/orders">
                <a>Orders</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={10}>
          <Login userInfo={userInfo} setUserInfo={setUserInfo} />
          {!userInfo.id && (
            <Button>
              <Link to="/signup">
                <a>Sign up</a>
              </Link>
            </Button>
          )}
          {userInfo.id && <Logout setUserInfo={setUserInfo} />}
        </Col>
      </Row>
    </StyledNavigationBar>
  );
};

export default NavigationBar;
