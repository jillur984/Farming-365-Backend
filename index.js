import express from "express"
import dbConnect from "./config/mongoDB.js";
import dotenv from "dotenv";
import cors from "cors"

import userRouter from "./routes/userRouter.js";
import produceRouter from "./routes/produceRouter.js";
dotenv.config()
const app=express();
// Allow frontend origin
app.use(cors({
  origin: "http://localhost:3000",  
}));

app.use(express.json());




app.use(express.json())
app.use(express.urlencoded({extended:true}))
dbConnect()

app.use("/api/test",(req,res)=>{
  res.send("Hello from Farming...")
})
app.use("/api/user", userRouter);
app.use("/api/produce",produceRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});