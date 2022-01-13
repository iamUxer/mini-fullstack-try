import express from "express";
import { db } from "../db.js";

const { users } = db.data;

const router = express.Router();

//Login
router.post("/users", function (req, res) {
  const { id, nickname, name, email } = req.body;
  const userInfo = users.find((user) => user.id === id);

  if (!userInfo) {
    res.status(401).send({ message: `This ID : "${id}" is not found` });
  } else {
    res.send(userInfo);
  }
});

//User Detail
router.get("/users/:id", function (req, res) {
  const id = req.params.id;
  const userInfo = users.find((user) => user.id === id);

  if (userInfo) {
    res.send(userInfo);
  } else {
    res.status(401).send({ message: `${id} not found` });
  }
});

//Signup
router.post("/users/new", function (req, res) {
  const newUser = req.body;
  if (users.find((user) => user.id === newUser.id)) {
    res
      .status(401)
      .send({ message: `user ID : "${newUser.id}" already exists` });
  } else {
    if (users.find((user) => user.nickname === newUser.nickname)) {
      res.status(401).send({
        message: `user Nickname : "${newUser.nickname}" already exists`,
      });
    } else {
      users.push({ ...newUser });
      db.write();
      res.send(newUser);
    }
  }
});

export default router;
