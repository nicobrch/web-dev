import express from "express";
import bcrypt from 'bcrypt';
import { getUser } from "services/user.service.js"

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = getUser(username);
  if (!user) {
    return res.status(400).json({ message: 'No user found' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  return res.status(200).json({ user });
})

export default router;