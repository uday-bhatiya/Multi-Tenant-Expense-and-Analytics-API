import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import expenseRouter from "./routes/expense.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/expense", expenseRouter)

app.get('/', (req, res) => {
    res.send('Hello, Multi-Tenant Expense and Analytics API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
