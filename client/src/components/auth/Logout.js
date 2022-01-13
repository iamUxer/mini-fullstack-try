import React, { useContext } from "react";
import { Button } from "antd";

const Logout = ({ setUserInfo }) => {
  return (
    <>
      <Button onClick={() => setUserInfo({})}>Logout</Button>
    </>
  );
};

export default Logout;
