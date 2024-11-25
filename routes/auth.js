import { Router } from "express";
import { sql } from "../db/neon.js";
import { generateToken, verifyToken } from "../middleware/auth.js";
import bcrypt from "bcryptjs";

export const authRouter = Router();

authRouter.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
        return res.status(401).send("Invalid email or password");
    }
    const match = await bcrypt.compareSync(password, user[0].password);
    if (!match) {
        return res.status(401).send("Invalid email or password");
    }
    const token = generateToken({ id: user[0].id, email: user[0].email });
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    });
    return res.redirect("/index.html");
});

authRouter.post("/auth/logout", async (req, res) => {
    res.clearCookie("token");
    return res.redirect("/login.html");
});

authRouter.post("/auth/register", async (req, res) => {
    const { email, password } = req.body;
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    try {
        await sql`INSERT INTO users (email, password) VALUES (${email}, ${hash})`;
        res.status(201).send("User created");
    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
});

authRouter.get("/auth/me", async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("Unauthorized");
    }
    const payload = verifyToken(token);
    if (!payload) {
        return res.status(401).send("Invalid token");
    }
    const user = await sql`SELECT id, email, wallet FROM users WHERE id = ${payload.id}`;
    res.status(200).json(user[0]);
})