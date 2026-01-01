import express from "express"
import dbConnect from "./config/mongoDB.js";
import dotenv from "dotenv";

import userRouter from "./routes/userRouter.js";
dotenv.config()
const app=express();
const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is in the whitelist
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
  credentials: true // Allow cookies/credentials
};

app.use(cors(corsOptions)); // Enable CORS with specific options


app.use(express.json())
app.use(express.urlencoded({extended:true}))
dbConnect()

app.use("/api/test",(req,res)=>{
  res.send("Hello from Farming...")
})
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});