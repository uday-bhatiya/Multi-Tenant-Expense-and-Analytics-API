import { createExpense } from "../services/expense.service.js";

export async function addExpense(req, res){
    try {
        const expense = await createExpense(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({
            error: "Transaction failed",
            errorMessage: error.message
        });
    }
}