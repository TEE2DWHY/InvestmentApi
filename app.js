const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./db/connect");
const authRouter = require("./routes/auth");
const investmentRouter = require("./routes/investment");
const notFound = require("./middleWare/notFound");
const errorHandler = require("./middleWare/errorHandler");
const cors = require("cors");
const authMiddleWear = require("./middleWare/authorization");
//middleWear
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/invest", authMiddleWear, investmentRouter);
//notFound
app.use(notFound);
//errorHandler
app.use(errorHandler);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`server is running on port: ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
