import express from "express";
import { fetchDates, createDate, updateDate, deleteDate } from "../controllers/date.controller.js";

const router = express.Router();

router.get("/", fetchDates)
router.post("/", createDate)
router.put("/:id", updateDate)
router.delete("/:id", deleteDate)


export default router;