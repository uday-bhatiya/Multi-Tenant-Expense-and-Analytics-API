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
        console.log("Transaction commited !");

        return expense[0];
    } catch (error) {
        console.error("An error occured during transaction ! ", error);
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
}

export async function categoryWiseMonthly(teamId, year, month){
    console.log("g")
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    try {
        const expense = await Expense.aggregate([
            {
                $match: {
                    teamId: new mongoose.Types.ObjectId(teamId),
                    createdAt: {$gte: start, $lt: end}
                }
            },
            {
                $group: {
                    _id: "$categoryId",
                    totalAmount: {$sum: "$amount"}
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {$unwind: "$category"},
            {
                $project: {
                    _id: 0,
                    category:"$category.name",
                    totalAmount: 1
                }
            },
            {$sort: {
                totalAmount: -1
            }}
        ]);

        return expense;
    } catch (error) {
        console.error("Failed to get category wise expense!", error);
        throw error;
    }
}
