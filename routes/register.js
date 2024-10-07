import express from "express";
import bcrypt from "bcrypt";
import { createUser } from "../services/user.service.js"

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await createUser(username, hashedPassword);
    console.log(`Register Service ✅ : Successful register for user ${username}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(`Register Service ❌ : Could not create user ${username}`);
    res.status(500).json({ message: 'User registration failed' });
  }
})

export default router;