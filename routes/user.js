const express = require("express");
import { signup } from "../controllers/user";

const router = express.Router();
router.post("/signup", signup);

export default router;
