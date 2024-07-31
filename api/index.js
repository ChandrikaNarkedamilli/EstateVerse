import express from 'express'
import cookieParser from 'cookie-parser'
import postroute from './routes/postRoute.js'
import authroute from './routes/authRoute.js'
import testroute from './routes/testRoute.js'
import userRoute from './routes/userRoute.js'
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express()
const port = process.env.PORT || 8800
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// const allowedOrigins = ['http://localhost:5173'];
// console.log('Client URL:', process.env.CLIENT_URL);
// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true,
// }));

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authroute)
app.use("/api/users",userRoute)
app.use("/api/posts",postroute)
app.use("/api/test",testroute)

app.listen(port, ()=>{
  console.log(`Server is running on PORT ${port}`)
})


