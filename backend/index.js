import 'dotenv/config';
import express from 'express';
import { neon } from '@neondatabase/serverless';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { cartRouter } from "./routes/cart.js";
import { productRouter } from "./routes/product.js";
import { userRouter } from "./routes/user.js";

const dbString = process.env.DATABASE_URL;
if (!dbString) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

export const sql = neon(dbString);

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(cartRouter);
app.use(productRouter);
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});