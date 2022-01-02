import React, { useContext } from "react";

const Logout = ({ setUserInfo }) => {
  return (
    <>
      <button onClick={() => setUserInfo({})}>Logout</button>
    </>
  );
};

export default Logout;
