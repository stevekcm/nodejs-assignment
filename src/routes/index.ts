import express from "express";
import salesRoute from "./salesRoute";

const router = express.Router();

router.use("/sales", salesRoute);

export default router;
