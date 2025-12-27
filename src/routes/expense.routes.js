import express from "express";
import { addExpense, getDailyTrend, getMonthlyExpense, getTopSpenders, getGreaterThanAvarage, getEachCategoryExpense, getExpense } from "../controllers/expense.controller.js";

const router = express.Router();

router.post("/", addExpense);
router.get("/monthly", getMonthlyExpense);
router.get("/yearly", getMonthlyExpense);
router.get("/daily", getDailyTrend);
router.get("/top-spender", getTopSpenders);
router.get("/greater-than-avarage", getGreaterThanAvarage);
router.get("/each-category", getEachCategoryExpense);
router.get("/get-expense", getExpense);

export default router;