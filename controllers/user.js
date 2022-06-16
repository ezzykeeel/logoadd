const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

import UserModal from "../models/user.js";

const secret = "test";

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassowrd = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassowrd,
      name: `${firstName} ${lastName}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};
