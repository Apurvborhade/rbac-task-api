import express from 'express';
import cors from 'cors';
import adminOnlyRoutes from './routes/adminOnlyRoute.js'
import authRouter from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import cookieParser from 'cookie-parser';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Routes
app.use('/api/v1/auth', authRouter);

app.use('/api/v1/admin', adminOnlyRoutes)

app.use('/api/v1/tasks', taskRoutes)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default app;