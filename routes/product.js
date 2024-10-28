import { Router } from 'express';
import { sql } from "../index.js";

export const productRouter = new Router();

/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: Get all products
 *      tags: [products]
 *      security:
 *          - cookieAuth: []  # Requiere autenticación por cookie
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                 application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          products:
 *                              type: array
 *                              description: List of products
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          description: Product ID
 *                                      price:
 *                                          type: number
 *                                          format: float
 *                                          description: Product price
 *                                      stock:
 *                                          type: integer
 *                                          description: Stock quantity
 *          404:
 *              description: No products found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: No products found
 *          500:
 *              description: Internal server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Internal server error
 */
productRouter.get("/api/products", async (req, res) => {
  const products = await sql('SELECT * FROM products');
  if (products.length === 0){
    console.log("No hay productos");
    return res.status(404).json({ message: "No hay productos" });
  }
  return res.status(200).send(JSON.stringify(products));
});