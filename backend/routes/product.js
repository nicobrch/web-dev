import { Router } from 'express';
import { sql } from "../index.js";

export const productRouter = new Router();

productRouter.get("/api/products", async (req, res) => {
  const products = await sql('SELECT * FROM products');
  if (products.length === 0){
    console.log("No hay productos");
    return res.status(404).json({ message: "No hay productos" });
  }
  return res.status(200).send(JSON.stringify(products));
});