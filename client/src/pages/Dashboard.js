import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";

const Dashboard = () => {
  const [userInfo] = useContext(UserContext);
  if (!userInfo.id) {
    return <Navigate to="/" replace={true} />;
  }
  return <div>dashboard</div>;
};

export default Dashboard;
