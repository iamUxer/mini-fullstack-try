import express from "express";
import { db } from "../db.js";

const { orders, users, products } = db.data;

const router = express.Router();

console.log("orders", orders);

router.get("/orders", function (req, res) {
  const orderList = orders.map((order) => {
    const seller = users.find((user) => user.id === order.sellerId);
    const product = products.find((product) => product.id === order.productId);
    return {
      id: order.id,
      seller,
      product,
    };
  });

  if (orderList) {
    res.json(orderList);
  } else {
    res.send({ message: `아직 판매 상품이 없습니다.` });
  }
});

//오더 상세 페이지 Api
router.get("/orders/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const order = orders.find((order) => order.id === id);
  console.log(order);
  if (order) {
    // 서버 사이드에서 데이터를 직접 가공해서 보내주기
    const seller = users.find((user) => user.id === order.sellerId);
    const product = products.find((product) => product.id === order.productId);
    res.json({
      id: order.id,
      seller,
      product,
    });
  } else {
    res.send({ message: `This order(${id}) is not existed` });
  }
});

export default router;
