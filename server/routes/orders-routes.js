import express from "express";
import { db } from "../db.js";

const { orders, users, products } = db.data;

const router = express.Router();

router.get("/orders", function (req, res) {
  const orderList = orders.map((order) => {
    // const seller = users.find((user) => user.id === order.sellerId);
    // const product = products.find((product) => product.id === order.productId);
    return {
      id: order.id,
      seller: order.seller,
      product: order.productName,
      price: order.price,
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
  if (order) {
    // 서버 사이드에서 데이터를 직접 가공해서 보내주기
    // const seller = users.find((user) => user.id === order.sellerId);
    // const product = products.find((product) => product.id === order.productId);
    // if (product) {
    //   res.json({
    //     id: order.id,
    //     seller,
    //     product,
    //   });
    // } else {
    // }
    res.json({
      ...order,
    });
  } else {
    res.send({ message: `This order(${id}) is not existed` });
  }
});

router.post("/orders/new", function (req, res) {
  const resOrder = req.body;
  const id = Math.max(...orders.map((order) => order.id)) + 1;

  const newOrder = {
    ...resOrder,
    id: id,
  };
  orders.push(newOrder);
  db.write();
  res.json({ id });
});

export default router;
