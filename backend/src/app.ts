import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser())

// Routes
app.use('/api/v1/auth', authRouter);


export default app;