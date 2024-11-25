import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.js";
import { productsRouter} from "./routes/products.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true
}));
app.use(authMiddleware);

app.use(express.static('front'));

app.get("/api/health", (req, res) => {
    res.status(200).send("🐱");
})

app.use("/api", authRouter);
app.use("/api", productsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});