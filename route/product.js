import express from "express";
import { createProduct, getallProduct, getSingleProducts, deleteProduct} from "../controller/product.js";


const router = express.Router();

router.post("/create", createProduct);

router.get("/all", getallProduct);

router.get("/:id", getSingleProducts)


export default router