import express from "express"
import { addProduce } from "../controllers/produceController";

const produceRouter=express.Router()
produceRouter.post("/list", addProduce);


export default produceRouter;