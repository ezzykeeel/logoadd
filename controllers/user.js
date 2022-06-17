import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user";

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

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    res.status(201).json({result, token});
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};
