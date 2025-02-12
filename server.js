import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/init_db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { loggerMiddleware } from './middlewares/logger.middleware.js';
import route from './routes/route.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(loggerMiddleware);

connectDb();
const PORT = process.env.PORT;
app.get('/', (req, res) => res.send('Hello World!'));
route.forEach((route) => app.use(route.key, route.route));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
