import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "/public")));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

// Credentials
const validUsername = "user123";
const validPassword = "password123";

// Routes
app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate the username and password
  if (username === validUsername && password === validPassword) {
    res.redirect("/success");
  } else {
    res.redirect("/failure");
  }
});

app.get("/success", (req, res) => {
  res.render("success", { message: "Logged In" });
});

app.get("/failure", (req, res) => {
  res.render("failure", { message: "Access denied" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
