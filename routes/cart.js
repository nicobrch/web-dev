import { Router } from 'express';
import { sql } from "../index.js";

export const cartRouter = new Router();

/**
 * @swagger
 * /api/cart:
 *     post:
 *       summary: Add Product to Cart
 *       description: Add a product to the user's shopping cart.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 productId:
 *                   type: integer
 *                   example: 2
 *                 quantity:
 *                   type: integer
 *                   example: 3
 *       responses:
 *         200:
 *           description: Product added successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Producto agregado al carrito con éxito
 *         400:
 *           description: Bad request - Missing fields, insufficient stock, or insufficient wallet balance
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: No hay stock suficiente
 *         404:
 *           description: User or product not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Usuario no encontrado
 *         500:
 *           description: Server error - Failed to insert into cart or update stock/wallet
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Error al insertar a la tabla carrito
 */
cartRouter.post("/api/cart", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) {
    console.log("Faltan campos");
    return res.status(400).json({ message: "Faltan campos" });
  }

  const users = await sql('SELECT * FROM users WHERE id = $1', [userId]);
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

  const total = Number(product.price) * Number(quantity);

  const newWallet = Number(user.wallet) - total;
  if (newWallet < 0){
    console.log("No cuenta con saldo suficiente");
    return res.status(400).json({ message: "No cuenta con saldo suficiente" });
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