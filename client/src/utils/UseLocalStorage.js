import { useState, useEffect } from "react";

const UseLocalStorage = (key) => {
  // state = userInfo
  const [state, setState] = useState(
    () =>
      //json => javascript data
      JSON.parse(window.localStorage.getItem(key)) || {}
    // 0) 최초 렌더링 시, 로컬스토리지에 user 정보가 있으면 가져오고 없으면 null
    //로컬스토리지에 json데이터를 javascript data로
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
    // 3) 로컬스토리지의 user 정보에 넘어온 state = userInfo 정보를 set 시켜준다.
    // data가 javascript 객체로 넘어오는걸까?
  }, [key, state]);

  return [state, setState];
  //setState를
};

export default UseLocalStorage;
