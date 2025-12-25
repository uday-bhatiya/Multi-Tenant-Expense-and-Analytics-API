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

export async function categoryWiseMonthly(teamId, year, month) {
    console.log("g")
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    try {
        const expense = await Expense.aggregate([
            {
                $match: {
                    teamId: new mongoose.Types.ObjectId(teamId),
                    createdAt: { $gte: start, $lt: end }
                }
            },
            {
                $group: {
                    _id: "$categoryId",
                    totalAmount: { $sum: "$amount" }
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
            { $unwind: "$category" },
            {
                $project: {
                    _id: 0,
                    category: "$category.name",
                    totalAmount: 1
                }
            },
            {
                $sort: {
                    totalAmount: -1
                }
            }
        ]);

        return expense;
    } catch (error) {
        console.error("Failed to get category wise expense!", error);
        throw error;
    }
}

export async function dailyTrend(teamId) {
    const from = new Date();
    from.setDate(from.getDate() - 30);
    console.log(from)
    try {
        const expense = await Expense.aggregate([
            {
                $match: {
                    teamId: new mongoose.Types.ObjectId(teamId),
                    createdAt: { $gte: from }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    total: { $sum: "$amount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        return expense;
    } catch (error) {
        console.error('Failed to get daily trend!', error);
        throw error;
    }
}

export async function topSpenders(teamId) {
    try {
        const spenders = await Expense.aggregate([
            {
                $match: {
                    teamId: new mongoose.Types.ObjectId(teamId)
                }
            },
            {
                $group: {
                    _id: "$userId",
                    total: { $sum: "$amount" }
                }
            },
            { $sort: { total: -1 } },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: 0,
                    user: "$user.name",
                    total: 1
                }
            }
        ]);

        return spenders;
    } catch (error) {
        console.error("Failed to get top spenders", error);
        throw error;
    }
}

export async function greaterThanAvarage() {
    const lastThrityDays = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    try {
        const expense = await Expense.aggregate([
            {
                $match: {
                    createdAt: {$gt: lastThrityDays}
                }
            },
            {
                $group: {
                    _id: "$teamId",
                    avgAmount: {$avg: "$amount"}
                }
            },
            {
                $lookup: {
                    from: "expenses",
                    localField: "_id",
                    foreignField: "teamId",
                    as: "expenses"
                }
            },
            {$unwind: "$expenses"}, 
            {
                $match: {
                    "expenses.createdAt": {$gt: lastThrityDays}
                }
            },
            {
                $match: {
                    $expr: {$gt: ["$expenses.amount", "$avgAmount"]}
                }
            },
            {
                $project: {
                    _id: 0,
                    teamId: "$_id",
                    avgAmount: 1,
                    expense: "$expenses"
                }
            }
        ]);

        return expense;
    } catch (error) {
        
    }
}