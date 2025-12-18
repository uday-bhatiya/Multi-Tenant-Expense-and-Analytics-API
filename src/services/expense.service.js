import mongoose from "mongoose";
import Expense from "../models/Expense.js";
import Team from "../models/Team.js";

export async function createExpense(data) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const expense = await Expense.create([data], { session });

        await Team.findByIdAndUpdate(
            data.teamId,
            { $inc: { totalExpense: data.amount } },
            { session }
        );

        await session.commitTransaction();
        console.log("Transaction committed.");

        return expense[0];

    } catch (error) {
        console.log("An error occurred during the transaction:" + error);
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
}