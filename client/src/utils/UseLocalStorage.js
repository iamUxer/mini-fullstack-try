import { useState, useEffect } from "react";

const UseLocalStorage = (key) => {
  // state = userInfo
  console.log("key : ", key);
  const [state, setState] = useState(
    //초기값
    () =>
      //json => javascript data
      JSON.parse(window.localStorage.getItem(key)) || {}
    // 0) 최초 렌더링 시, 초기값으로 로컬스토리지에 user 정보가 있으면 가져오고 없으면 null
    //로컬스토리지에 json데이터를 javascript data로
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
    // 3)
    // 자바스크립스 객체를 JSON string 형태로 localstorage에 set 시켜준다.
  }, [key, state]);

  return [state, setState];
  //setState를
};

export default UseLocalStorage;
