//express 셋팅
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { db } from "./db.js";
import ProductRoute from "./routes/products-routes.js";
import UserRoute from "./routes/users-routes.js";
import OrderRoute from "./routes/orders-routes.js";
dotenv.config();
const PORT = 8080;

import indexRouter from "./routes/index";
import ordersRouter from "./routes/orders-routes";
import postsRouter from "./routes/products-routes";
import usersRouter from "./routes/users-routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", indexRouter);
app.use(UserRoute);
app.use(OrderRoute);
app.use(OrderRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening at ${process.env.SERVER_URL}`);
});
