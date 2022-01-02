//express 셋팅
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { db } from "./db.js";
import ProductRoute from "./routes/products-routes.js";
import UserRoute from "./routes/users-routes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8080;

app.use(ProductRoute);
app.use(UserRoute);

//브라우저에서 get요청이 들어오면 res.send로 응답해준다.
app.get("/", function (req, res) {
  res.send(db.data.products);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening at ${process.env.SERVER_URL}`);
});
