const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ApiClient = (URL) => {
  return fetch(`${SERVER_URL}/${URL}`).then((res) => res.json());
  //fetch API의 응답(response) 객체는json()를 제공하고 있어JSON.parse() 대신 사용할 수 있다.
  //response.json()메서드를 호출하면 JSON 데이터를 javascript 객체로 변환한다.
};

export default ApiClient;
