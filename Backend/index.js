import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './Config/db.js'
import cookieParser from 'cookie-parser';
import router from './Routes/userRouter.js'
import slotRouter from './Routes/slotRouter.js';
import formRouter from './Routes/userformRouter.js';

const app = express()
dotenv.config()

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  }));

app.use(express.json())
app.use(cookieParser())



connectDB();

app.use('/api/auth', router)
app.use('/api/slot', slotRouter)
app.use('/api/form', formRouter)
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);

})


