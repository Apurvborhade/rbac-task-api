import swaggerJsdoc from "swagger-jsdoc";
import { PORT } from "../utils/constants.js";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Secure RBAC API",
      version: "1.0.0",
      description: "Scalable REST API with JWT Authentication and Role-Based Access Control",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1`,
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // where swagger comments will live
};

export const swaggerSpec = swaggerJsdoc(options);