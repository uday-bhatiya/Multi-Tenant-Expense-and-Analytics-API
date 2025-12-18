import mongoose from "mongoose";

import User from "../models/User.js";
import Team from "../models/Team.js";
import Expense from "../models/Expense.js";
import Category from "../models/Category.js";

await mongoose.connect("");

await User.deleteMany();
await Team.deleteMany();
await Expense.deleteMany();
await Category.deleteMany();

const users = await User.insertMany([
    { name: "Johan", email: "johan@example.com" },
    { name: "Ayanokoji", email: "ayanokoji@example.com" },
    { name: "Yuichi", email: "yuichi@example.com" },
    { name: "Liluch", email: "liluch@example.com" },
    { name: "Makima", email: "makima@example.com" },
]);
console.log("Users", users);

const team = await Team.create({
    name: "Core Team",
    ownerId: users[0]._id,
    members: users.map((user) => user._id)
});
console.log("Team", team);

await User.updateMany(
    { _id: { $in: users.map((user) => user._id) } },
    { $push: { team: team._id } }
);

const categories = await Category.insertMany([
    { name: "Food", teamId: team._id },
    { name: "Travel", teamId: team._id },
    { name: "Shopping", teamId: team._id },
    { name: "Bills", teamId: team._id },
    { name: "Other", teamId: team._id }
]);
console.log("Category", categories);

const expenses = [];
for( let i = 0; i < 20; i++ ){
    expenses.push({
        amount: Math.floor(Math.random() * 5000) + 100,
        userId: users[i % users.length]._id,
        teamId: team._id,
        categoryId: categories[i % categories.length]._id,
        note: "Seed Expense",
        createdAt: new Date(Date.now() - i * 86400000)
    });
}

await Expense.insertMany(expenses);
console.log("Expense", expenses);