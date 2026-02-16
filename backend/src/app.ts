import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoutes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/v1/auth', authRouter);


export default app;