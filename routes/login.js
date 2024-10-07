import express from "express";
import bcrypt from 'bcrypt';
import { getUser } from "../services/user.service.js"

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(username);
  if (!user) {
    console.log(`Login Service ❌ : No user found for username ${username}`);
    return res.status(400).json({ message: 'No user found' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    console.log(`Login Service ❌ : Invalid password match for username ${username}`);
    return res.status(400).json({ message: 'Invalid password' });
  }

  console.log(`Login Service ✅ : Successful login for user ${username}`);
  return res.status(200).json({ user });
})

export default router;