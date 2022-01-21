import express from "express";
const router = express.Router();

//브라우저에서 get요청이 들어오면 res.send로 응답해준다.
app.get("/", function (req, res) {
  res.send(db.data.products);
});

export default router;
