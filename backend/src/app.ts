import express from 'express';
import cors from 'cors';
import adminOnlyRoutes from './routes/adminOnlyRoute.js'
import authRouter from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';

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

export default app;