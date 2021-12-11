//express 셋팅
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
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

//detail page
app.get("/products/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const product = products.find((prd) => prd.id === id);
  if (product) {
    res.send(product);
  } else {
    res.send({ message: `${id} is not existed` });
  }
});

//add a new item
app.post("/products", function (req, res) {
  const { name, price, year } = req.body;
  const id = products[products.length - 1].id + 1;
  const newProduct = {
    id,
    name,
    price,
    year,
  };
  products.push(newProduct);
  res.send({ id });
});

//edit item
app.put("/products/:id", function (req, res) {
  const { name, price, year } = req.body;
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((prd) => prd.id === id);

  if (productIndex !== undefined) {
    products[productIndex] = {
      id,
      name,
      price,
      year,
    };
    res.send({ id });
  } else {
    res.send({ message: `id: ${id} is not existed ` });
  }
});

//delete item
app.delete("/products/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((prd) => prd.id === id);
  if (productIndex !== undefined) {
    products.splice(productIndex, 1);
    res.send(products);
  } else {
    res.send({ message: `id: ${id} is not existed` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
