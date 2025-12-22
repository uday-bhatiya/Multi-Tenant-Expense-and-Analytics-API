import { createExpense, categoryWiseMonthly, categoryWiseYearly } from "../services/expense.service.js";

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

export async function getMonthlyExpense(req, res) {
    try {
        const {teamId, year, month} = req.query;
        const expense = await categoryWiseMonthly(teamId, year, month);
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({
            error: "Failed to get Monthly",
            errorMessage: error.message
        });
    }
}
