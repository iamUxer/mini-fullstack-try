import express from "express";
import { db } from "../db.js";

const { products } = db.data;

const router = express.Router();

//products Api 생성
router.get("/products", function (req, res) {
  res.json(products);
});

//detail page
router.get("/products/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const product = products.find((prd) => prd.id === id);
  if (product) {
    res.json(product);
  } else {
    res.send({ message: `${id} is not existed` });
  }
});

//add a new item
router.post("/products", function (req, res) {
  const product = req.body;
  const id = Math.max(...products.map((prd) => prd.id)) + 1;
  const newProduct = {
    id,
    ...product,
  };
  console.log(newProduct);
  products.push(newProduct);
  db.write();
  res.json({ id });
});

//edit item
router.put("/products/:id", function (req, res) {
  const { productName, price, year, sellerId } = req.body;
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((prd) => prd.id === id);

  if (productIndex !== undefined) {
    products[productIndex] = {
      id,
      productName,
      price,
      year,
      sellerId,
    };
    db.write();
    res.json({ id });
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
    res.json(products);
  } else {
    res.send({ message: `id: ${id} is not existed` });
  }
});

export default router;
