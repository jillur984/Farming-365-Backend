import express from "express"
import dbConnect from "./config/mongoDB.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";

const app=express();
dotenv.config()

app.use(express());
app.use(express.urlencoded({extended:true}))
dbConnect()

app.use("/api/test",(req,res)=>{
  res.send("Hello from Farming")
})
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});