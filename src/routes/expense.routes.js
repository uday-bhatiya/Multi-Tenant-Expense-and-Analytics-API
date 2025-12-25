import express from "express";
import { addExpense, getDailyTrend, getMonthlyExpense, getTopSpenders, getGreaterThanAvarage } from "../controllers/expense.controller.js";

const router = express.Router();

router.post("/", addExpense);
router.get("/monthly", getMonthlyExpense);
router.get("/yearly", getMonthlyExpense);
router.get("/daily", getDailyTrend);
router.get("/top-spender", getTopSpenders);
router.get("/greater-than-avarage", getGreaterThanAvarage);

export default router;