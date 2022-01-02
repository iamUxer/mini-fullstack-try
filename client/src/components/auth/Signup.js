import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Signup = () => {
  const [setUserInfo] = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(null);
  const [newUser, setNewuser] = useState({
    id: "",
    name: "",
    nickname: "",
    email: "",
  });

  const handleToggle = () => {
    setToggle(!toggle);
    if (toggle === false) {
      setNewuser({
        id: "",
        name: "",
        nickname: "",
        email: "",
      });
    }
  };

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
    console.log(toggle);
  };

  return (
    <>
      {!toggle && <button onClick={handleToggle}>Sign Up</button>}
      {toggle && (
        <div>
          <p>가입하기</p>
          <form>
            <input
              type="text"
              name="id"
              value={newUser.id}
              onChange={handleChange}
              placeholder="ID"
            />
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="nickname"
              value={newUser.nickname}
              onChange={handleChange}
              placeholder="Nickname"
            />
            <input
              type="text"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <button onClick={handleToggle}>Cancel</button>
            <button onClick={handleSignUp}>Sign up</button>
          </form>
        </div>
      )}
      {error && <h2 style={{ color: "red" }}>{error}</h2>}
    </>
  );
};

export default Signup;
