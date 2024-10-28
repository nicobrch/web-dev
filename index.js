import 'dotenv/config';
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { neon } from '@neondatabase/serverless';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { cartRouter } from "./routes/cart.js";
import { productRouter } from "./routes/product.js";

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

// Docs
const swaggerSpecs = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Example API',
      version: '1.0.0',
      description: 'API docs',
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use(cartRouter);
app.use(productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});