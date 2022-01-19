import React, { useState, useEffect, useContext } from "react";
import { Input, Button, Modal } from "antd";
import { UserContext } from "../../App";
import AuthModal from "../modal";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = () => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  // 2) 유저정보가 업데이트 되면 리랜더링이 일어나고 커스텀 훅(UserContext)이 실행된다.
  const [user, setUser] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userInfo.id) {
      setUser("");
    }
  }, [userInfo]);

  const handleLogin = () => {
    fetch(`${SERVER_URL}/users/`, {
      method: "POST",
      body: JSON.stringify({ id: user }),
      //javascript data => json string
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
        // 1) 클릭했을때, 서버에서 넘어온 유저정보가 업데이트 되고
      })
      .catch((error) => setError(error.message));
    // 여기서 에러는 무엇일까?
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      {!!userInfo.id && <div>{userInfo.name}, Welcome!</div>}
      {!userInfo.id && (
        <>
          <Input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="User ID"
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleLogin} type="submit">
            Login
          </Button>
        </>
      )}

      <AuthModal title="Login Error" visible={userInfo}>
        <p style={{ color: "red" }}>
          {userInfo.message} {error}
        </p>
      </AuthModal>
    </>
  );
};

export default Login;
