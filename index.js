import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user";

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extened: true }));
app.use(cors());

app.use("/user", userRouter); // http://localhost:5000/user/signup

const MONGODB_URL =
  // "mongodb+srv://zeke223:zekepass1@cluster0.fj9uhmv.mongodb.net/?retryWrites=true&w=majority";
  "mongodb+srv://ezzykeeel:adminforever21@cluster0.tb2t3np.mongodb.net/?retryWrites=true&w=majority"

const port = 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
