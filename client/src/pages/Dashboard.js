import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Dashboard = () => {
  const [userInfo] = useContext(UserContext);
  const navigate = useNavigate();
  if (!userInfo.id) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div>
      <div onClick={() => navigate("/products")}>Go to products list</div>
      <div onClick={() => navigate("/orders")}>Go to orders list</div>
    </div>
  );
};

export default Dashboard;
