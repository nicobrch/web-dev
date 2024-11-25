import { Router } from "express";
import { sql } from "../db/neon.js";

export const cartRouter = Router();

cartRouter.get("/cart", async (req, res) => {
    const token = req.cookies.token;
    const { id } = token;
    const cart = await sql`SELECT * FROM cart WHERE user_id = ${id}`;
    res.status(200).send(JSON.stringify(cart));
});

cartRouter.post("/cart", async (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        console.log("Faltan campos");
        return res.status(400).json({ message: "Faltan campos" });
    }

    const token = req.cookies.token;
    const { id } = token;

    const users = await sql('SELECT * FROM users WHERE id = $1', [id]);
    if (users.length === 0){
        console.log("Usuario no encontrado");
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const user = users[0];

    const products = await sql('SELECT * FROM products WHERE id = $1', [productId]);
    if (products.length === 0){
        console.log("Producto no encontrado");
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    const product = products[0];

    if (Number(quantity) > Number(product.stock)){
        console.log("No hay stock suficiente");
        return res.status(400).json({ message: "No hay stock suficiente" });
    }

    const results = await sql('INSERT INTO cart (user_id, product_id, quantity, total) VALUES ($1, $2, $3, $4) RETURNING id', [userId, productId, quantity, total]);
    if (results.length === 0){
        console.log("Error al insertar a la tabla carrito");
        return res.status(500).json({ message: "Error al insertar a la tabla carrito" });
    }

    const newStock = Number(product.stock) - Number(quantity);
    const updateProduct = await sql('UPDATE products SET stock = $1 WHERE id = $2 RETURNING id', [newStock, productId]);
    if (updateProduct.length === 0){
        console.log("Error al actualizar stock");
        return res.status(500).json({ message: "Error al actualizar stock" });
    }

    const updateUser = await sql('UPDATE users SET wallet = $1 WHERE id = $2 RETURNING id', [newWallet, userId]);
    if (updateUser.length === 0){
        console.log("Error al actualizar saldo");
        return res.status(500).json({ message: "Error al actualizar saldo" });
    }

    console.log("Producto agregado al carrito con éxito");
    return res.status(200).json({ message: "Producto agregado al carrito con éxito" });
});