import { Router } from "express";
import { UserModel } from "../models/user.js";
import { createHash } from "../utils/hash.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }

    const user = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password)
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
