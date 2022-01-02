import React, { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../App";

const Landing = () => {
  const [userInfo] = useContext(UserContext);
  const navigate = useNavigate();
  if (userInfo.id) {
    return <Navigate to="/dashboard" replace={true} />;
  }
  return (
    <>
      <div>Hello World!</div>
      <div onClick={() => navigate("/products")}>
        <a>go to products list</a>
      </div>
    </>
  );
};

export default Landing;
