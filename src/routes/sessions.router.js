import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import { UserModel } from "../models/user.js";
import { createHash, isValidPassword } from "../utils/hash.js";
import { cartModel } from "../dao/models/cartModel.js";

import { sendRecoveryEmail } from "../utils/mailing.js";

import UserDTO from "../dto/UserDTO.js";

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
      process.env.JWT_SECRET || "jwtSecret",
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
  passport.authenticate("jwt",{session:false}),
  (req,res)=>{

    const user = new UserDTO(req.user);

    res.send({
        status:"success",
        user
    });

  }
);




router.post("/forgot-password", async (req,res)=>{

  try{

    const { email } = req.body;

    const user = await UserModel.findOne({email});

    if(!user){

      return res.status(404).send({
        status:"error",
        message:"User not found"
      });

    }


    const token = jwt.sign(
      { email:user.email },
      process.env.JWT_SECRET || "jwtSecret",
      { expiresIn:"1h" }
    );


    const link = `http://localhost:8080/reset-password?token=${token}`;


    await sendRecoveryEmail(user.email,link);

    res.send({
      status:"success",
      message:"Recovery email sent"
    });

  }catch(error){

    res.status(500).send({
      status:"error",
      message:error.message
    });

  }

});



router.post("/reset-password", async (req,res)=>{

  try{

    const { token,password } = req.body;


    const decoded = jwt.verify(token,process.env.JWT_SECRET || "jwtSecret");

    const user = await UserModel.findOne({email:decoded.email});

    if(!user){

      return res.status(404).send({
        status:"error",
        message:"User not found"
      });

    }


    if(isValidPassword(user,password)){

      return res.status(400).send({
        status:"error",
        message:"You cannot use the same password"
      });

    }


    user.password = createHash(password);

    await user.save();

    res.send({
      status:"success",
      message:"Password updated"
    });

  }catch(error){

    res.status(400).send({
      status:"error",
      message:"Invalid or expired token"
    });

  }

});


export default router;

