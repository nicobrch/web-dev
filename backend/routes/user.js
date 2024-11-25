import { Router } from 'express';
import { sql } from "../index.js";

export const userRouter = new Router();

userRouter.get("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await sql('SELECT * FROM users WHERE id = $1', [id]);
    if (user.length === 0){
        console.log("No hay usuarios");
        return res.status(404).json({ message: "No hay usuarios" });
    }
    return res.status(200).send(JSON.stringify(user));
});