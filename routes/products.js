import { Router } from "express";
import { sql } from "../db/neon.js";

export const productsRouter = Router();

productsRouter.get("/products", async (req, res) => {
    const products = await sql`SELECT * FROM products`;
    res.status(200).send(JSON.stringify(products));
});