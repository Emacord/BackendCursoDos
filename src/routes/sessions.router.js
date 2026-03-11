import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import { createHash } from "../utils/hash.js";
import { cartModel } from "../dao/models/cartModel.js";

const router = Router();



router.post("/register", async (req, res) => {
  try {

    const { first_name, last_name, email, age, password } = req.body;

    const existUser = await UserModel.findOne({ email });

    if (existUser) {
      return res.status(400).send({
        status: "error",
        message: "User already exists"
      });
    }

    const cart = await cartModel.create({ products: [] });

    const user = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
      cart: cart._id
    });

    res.send({
      status: "success",
      message: "User registered successfully",
      cart: cart._id
    });

  } catch (error) {

    res.status(500).send({
      status: "error",
      message: error.message
    });

  }
});



router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  async (req, res) => {

    const token = jwt.sign(
      { user: req.user },
      "jwtSecret",
      { expiresIn: "1h" }
    );

    res.cookie("jwtCookie", token, { httpOnly: true }).send({
      status: "success",
      message: "Login successful",
      cart: req.user.cart
    });

  }
);



router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    res.send({
      status: "success",
      user: req.user
    });

  }
);


export default router;
