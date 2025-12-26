import { createExpense, categoryWiseMonthly, dailyTrend, topSpenders, greaterThanAvarage, eachCategoryExpense} from "../services/expense.service.js";

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

export async function getDailyTrend(req, res) {
    try {
        const {teamId} = req.query;
        const expense = await dailyTrend(teamId);
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({
            error: "Failed to get Daily trend",
            errorMessage: error.message
        })
    }
}

export async function getTopSpenders(req, res){
    try {
        const {teamId} = req.query;
        const spenders = await topSpenders(teamId);
        res.status(200).json(spenders);
    } catch (error) {
        res.status(500).json({
            error: "Failed to get top spenders",
            errorMessage: error.message
        });
    }
}

export async function getGreaterThanAvarage(req, res){
    try {
        // const {teamId} = req.query;
        const expense = await greaterThanAvarage();
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({
            error: "Failed to get expense",
            errorMessage: error.message
        });
    }
}

export async function getEachCategoryExpense(req, res){
   try {
     const expense = await eachCategoryExpense();
     res.status(200).json(expense);
   } catch (error) {
    res.status(500).json({
        error: "Failed to get category expense",
        errorMessage: error.message
    });
   }
}