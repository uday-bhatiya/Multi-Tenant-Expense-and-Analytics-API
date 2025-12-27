import Expense from "../models/Expense.js";
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

/////////// PAGINATION ///////////

/////////// Off Set Paginatoion

export async function getExpense(req, res){
    try {

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const skip = (page - 1) * limit;

        const expense = await Expense.find().sort({createdAt: -1}).skip(skip).limit(limit);

        res.status(200).json(expense);
        
    } catch (error) {
        res.status(500).json({
            error: "Error in pagination",
            errorMessage: error.message
        });
    }
}

/////////// Cursor Based Paginatoion

export async function getExpenseCursor(req,res){
    try {

        const limit = parseInt(req.query.limit);
        const cursor = req.query.cursor;

        const query = cursor ? {_id: {$lt: cursor}} : {};

        const expense = await Expense.find(query).sort({_id: -1}).limit(limit + 1);

        const hasMore = expense.length > limit;
        if(hasMore) expense.pop();

        res.status(200).json({
            data: expense,
            nextCursor: hasMore ? expense[expense.length - 1]._id : null,
            hasMore
        });
        
    } catch (error) {
        res.status(500).json({
            error: "Error in pagination",
            errorMessage: error.message
        });
    }
}