import express from "express";
import salesService from "../services/salesService";

const router = express.Router();

router.post("/record", salesService.record);
router.post("/report", salesService.report);

export default router;
