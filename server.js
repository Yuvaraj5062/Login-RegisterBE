const express = require("express");
const { connectDb } = require("./helpers/connectDb");
require("express-async-errors");
var cors = require('cors')

const { errorHandlerMiddleware } = require("./middlewares/errorHandler");
const { notFound } = require("./middlewares/notFound");
const app = express();

const AuthRouter = require("./routes/auth");

app.use(cors())
app.use(express.json());

app.use("/api/v1/auth", AuthRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  await connectDb("mongodb+srv://yuvaraj:yuva9978@cluster0.mrgflhj.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("connected to db.."))
    .catch((e) => console.log(e));

  app.listen(8080, () => console.log("Server running on 8080..."));
};

start();
