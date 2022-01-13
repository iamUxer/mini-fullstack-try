import express from "express";
import { db } from "../db.js";

const { orders } = db.data;

const router = express.Router();

console.log("orders", orders);
//오더 상세 페이지 Api
router.get("/orders/:id", function (req, res) {
  console.log(req.params);
  const id = parseInt(req.params.id);
  const order = orders.find((ord) => ord.id === id);
  console.log(id);
  if (order) {
    res.send(order);
  } else {
    res.send({ message: `This order id "${id}" is not existed` });
  }
});

export default router;
