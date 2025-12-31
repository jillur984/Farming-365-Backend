import express from "express"
import dbConnect from "./config/mongoDB.js";
import dotenv from "dotenv";
const app=express();
dotenv.config()

app.use(express());
dbConnect()

app.get('/api/test', (req, res) => {
  res.send('Hello from Render!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});