import mongoose from "mongoose";


const dbConnect=async()=>{
    try {
        mongoose.connection.on("connected",()=>{
            console.log("DB is Connected")
        })
        console.log(process.env.MONGODB_URI)
    await mongoose.connect("mongodb+srv://jillurcsebd_db_user:wAd3AZCwvlQVHUPX@cluster0.a9inank.mongodb.net/farming_DB")
    } catch (error) {
        console.log("Database Connection Error",error)
    }
}

export default dbConnect;