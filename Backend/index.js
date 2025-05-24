import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Config/db.js';
import cookieParser from 'cookie-parser';
import router from './Routes/userRouter.js';
import slotRouter from './Routes/slotRouter.js';
import formRouter from './Routes/userformRouter.js';

const app = express();
dotenv.config();

app.use(cors({
  origin: process.env.CORS,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// ✅ Health Check Route to avoid 404 during ping
app.get('/api/ping', (req, res) => {
  res.send('pong');
});

// API Routes
app.use('/api/auth', router);
app.use('/api/slot', slotRouter);
app.use('/api/form', formRouter);

// ✅ Self-ping every 1 minute for all routes
const BASE_URL = 'https://appointment-1-pq6g.onrender.com';

const pingRoutes = ['/api/ping', '/api/auth', '/api/slot', '/api/form'];

setInterval(() => {
  pingRoutes.forEach(route => {
    fetch(`${BASE_URL}${route}`)
      .then(res => console.log(`Pinged ${route}:`, res.status))
      .catch(err => console.error(`Error pinging ${route}:`, err));
  });
}, 60 * 1000); // every 1 minute

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
