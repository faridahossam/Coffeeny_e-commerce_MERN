import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRoute";
import productRouter from "./routers/productRoute";
import { seedInitialProducts } from "./services/productService";

const app = express();
const port = 3001;

app.use(express.json())

mongoose
    .connect("mongodb://localhost:27017/ecommerce")
    .then(() => console.log("Mongo Connected"))
    .catch((err) => console.log("Connection Failed!", err));

// seed the products to database
seedInitialProducts();

app.use("/user" , userRouter)
app.use("/product", productRouter);


app.listen(port , () =>{
    console.log(`Server is running at: http://localhost:${port} `)
})