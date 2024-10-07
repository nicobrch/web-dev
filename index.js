import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import loginRoutes from "./routes/login.js";
import registerRoutes from "./routes/register.js";
import indexRoutes from "./routes/index.js"

const PORT = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

// Routes
app.use("/", indexRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});