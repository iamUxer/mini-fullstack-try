import React, { useContext } from "react";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import Signup from "../auth/Signup";
import { UserContext } from "../../App";

const NavigationBar = () => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  return (
    <div>
      <Login userInfo={userInfo} setUserInfo={setUserInfo} />
      {!userInfo.id && <Signup userInfo={userInfo} setUserInfo={setUserInfo} />}
      {userInfo.id && <Logout setUserInfo={setUserInfo} />}
    </div>
  );
};

export default NavigationBar;
