import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = () => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [user, setUser] = useState("");
  //   const [userInfo, setUserInfo] = useLocalStorage("user");
  // 2) 유저정보가 업데이트 되면 리랜더링이 일어나고 커스텀 훅이 실행된다.
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
        console.log(data);
        // 1) 클릭했을때, 유저정보가 업데이트 되고
      })
      .catch((error) => setError(error.message));
  };

  return (
    <>
      {!!userInfo.id && <div>{userInfo.name}, Welcome!</div>}
      {!userInfo.id && (
        <div>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="User ID"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
      {!!userInfo.message || error ? (
        <h2 style={{ color: "red" }}>
          {userInfo.message} {error}
        </h2>
      ) : null}
    </>
  );
};

export default Login;
