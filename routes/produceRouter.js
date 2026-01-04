import express from "express"
import { addProduce } from "../controllers/produceController.js";

const produceRouter=express.Router()
produceRouter.post("/list", addProduce);


export default produceRouter;