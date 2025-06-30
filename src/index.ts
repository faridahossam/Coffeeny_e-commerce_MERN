import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRoute";

const app = express();
const port = 3001;

app.use(express.json())

mongoose
    .connect("mongodb://localhost:27017/ecommerce")
    .then(() => console.log("Mongo Connected"))
    .catch((err) => console.log("Connection Failed!", err));
app.use("/user" , userRouter)


app.listen(port , () =>{
    console.log(`Server is running at: http://localhost:${port} `)
})