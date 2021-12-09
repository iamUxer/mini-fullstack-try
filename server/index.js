//express 셋팅
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = 8080;

const products = [
  {
    id: 1,
    name: "diablo",
    price: 30000,
    year: 2002,
  },
  {
    id: 2,
    name: "starcraft",
    price: 40000,
    year: 2001,
  },
];

//브라우저에서 get요청이 들어오면 res.send로 응답해준다.
app.get("/", function (req, res) {
  res.send("hello world");
});

//products Api 생성
app.get("/products", function (req, res) {
  res.send(products);
});
app.get("/products/:id", function (req, res) {
  console.log(parseInt(req.params.id));
  const id = parseInt(req.params.id);
  const product = products.find((prd) => prd.id === id);
  if (product) {
    res.send(product);
  } else {
    res.send({ message: `${id} is not existed` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
