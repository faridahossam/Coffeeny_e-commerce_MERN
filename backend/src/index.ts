import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRoute";
import productRouter from "./routers/productRoute";
import { seedInitialProducts } from "./services/productService";
import cartRoute from "./routers/cartRoute";
import cors from "cors";

dotenv.config();
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.DATABASE_URL||'')
    .then(() => console.log("Mongo Connected"))
    .catch((err) => console.log("Connection Failed!", err));

// seed the products to database
seedInitialProducts();

app.use("/user" , userRouter)
app.use("/product", productRouter);
app.use("/cart",cartRoute)

app.listen(port , () =>{
    console.log(`Server is running at: http://localhost:${port} `)
})