const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extened: true }));
app.use(cors());

const MONGODB_URL =
  "mongodb+srv://zeke223:zekepass1@cluster0.fj9uhmv.mongodb.net/?retryWrites=true&w=majority";

const port = 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
