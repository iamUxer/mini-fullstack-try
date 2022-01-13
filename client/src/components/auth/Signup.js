import React, { useState, useContext } from "react";
import { Input, Button, Form } from "antd";
import { UserContext } from "../../App";
import AuthModal from "../modal";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Signup = () => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [error, setError] = useState(null);
  const [newUser, setNewuser] = useState({
    id: null,
    name: null,
    nickname: null,
    email: null,
  });
  console.log("*****", userInfo);
  const handleSignUp = () => {
    fetch(`${SERVER_URL}/users/new`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserInfo(data);
        setError(data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewuser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <p>가입하기</p>
      <Input
        type="text"
        name="id"
        value={newUser.id}
        onChange={handleChange}
        placeholder="ID"
      />
      <Input
        type="text"
        name="name"
        value={newUser.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <Input
        type="text"
        name="nickname"
        value={newUser.nickname}
        onChange={handleChange}
        placeholder="Nickname"
      />
      <Input
        type="text"
        name="email"
        value={newUser.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {/* <Button onClick={handleToggle}>Cancel</Button> */}
      <Button onClick={handleSignUp}>Sign up</Button>
      {/* <AuthModal title="Sign Up Error" visible={userInfo.message}>
        <p style={{ color: "red" }}>{userInfo.message} </p>
      </AuthModal> */}
    </>
  );
};

export default Signup;
