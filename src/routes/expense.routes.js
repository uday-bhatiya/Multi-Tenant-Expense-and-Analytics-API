import express from "express";
import { addExpense, getMonthlyExpense } from "../controllers/expense.controller.js";

const router = express.Router();

router.post("/", addExpense);
router.get("/monthly", getMonthlyExpense);
router.get("/yearly", getMonthlyExpense);

export default router;