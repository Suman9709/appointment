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

connectDB();

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

app.use('/api/auth', router);
app.use('/api/slot', slotRouter);
app.use('/api/form', formRouter);

const BASE_URL = 'https://appointment-1-pq6g.onrender.com/api/auth/ping';
// const BASE_URL_local = 'http://localhost:5000/api/auth/ping';

// const pingRoutes = ['/api/auth', '/api/slot', '/api/form'];

setInterval(() => {
  fetch(BASE_URL)
    .then(res => console.log(`Pinged`, res.status))
    .catch(err => console.error(`Error pinging`, err));
}, 5 * 1000);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
