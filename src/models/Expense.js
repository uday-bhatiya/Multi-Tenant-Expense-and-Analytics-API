import mongoose, { Schema } from "mongoose";

const ExpenseSchema = new Schema({
    amount: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    note: String
});

const Expense = mongoose.model("Expense", ExpenseSchema);

export default Expense;