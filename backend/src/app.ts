import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import apiRoutes from './routes/api.js';
dotenv.config();
const app=express();
app.use(cors({origin:process.env.FRONTEND_ORIGIN??'http://localhost:3000'})); app.use(express.json()); app.get('/',(_req,res)=>res.status(200).json({success:true,message:'Backend Todo berjalan.'})); app.use('/api',apiRoutes);
export default app;