import express from "express";
import { db } from "../db.js";

const { products } = db.data;

const router = express.Router();

//products Api 생성
router.get("/products", function (req, res) {
  res.send(products);
});

//detail page
router.get("/products/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const product = products.find((prd) => prd.id === id);
  if (product) {
    res.send(product);
  } else {
    res.send({ message: `${id} is not existed` });
  }
});

//add a new item
router.post("/products", function (req, res) {
  const { name, price, year } = req.body;
  const id = Math.max(...products.map((prd) => prd.id)) + 1;
  const newProduct = {
    id,
    name,
    price,
    year,
  };
  products.push(newProduct);
  db.write();
  res.send({ id });
});

//edit item
router.put("/products/:id", function (req, res) {
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
    db.write();
    res.send({ id });
  } else {
    res.send({ message: `id: ${id} is not existed ` });
  }
});

//delete item
router.delete("/products/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((prd) => prd.id === id);
  if (productIndex !== undefined) {
    products.splice(productIndex, 1);
    db.write();
    res.send(products);
  } else {
    res.send({ message: `id: ${id} is not existed` });
  }
});

export default router;
