// src/StateManagement/Slices/ExpensesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    friends: [
        {id:'18', name: 'Virat Kohli'},
        {id: '2', name: "Sunil Gavaskar"},
        {id:"10", name: "Sachin Tendulkar"},
        {id:"45", name: "Rohit Sharma"},
        {id:'7', name: 'MS Dhoni'},
        // Add more friends if needed
    ],
    expenses: [
        { id: '1', friendId: '18', date: 'Mar 18', description: "Ellie's bakery", amount: 51.36, type: 'borrowed' },
        { id: '4', friendId: '18', date: 'Mar 18', description: "Ben Stokes", amount: 21.36, type: 'borrowed' },
        { id: '2', friendId: '10', date: 'Mar 10', description: 'Fuel up', amount: 24.03, type: 'lent' },
        { id: '3', friendId: '45', date: 'Mar 06', description: 'Movie night', amount: 2.5, type: 'lent' },
    ],
};

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            const baseId = `${Date.now()}`; // Generate a unique base ID for each batch
            const newExpenses = transformExpense({ ...action.payload, id: baseId });
            state.expenses.push(...newExpenses);
        },
        settleExpense: (state, action) => {
            const { expenseId } = action.payload;
            state.expenses = state.expenses.filter(expense => expense.id !== expenseId);
        },
    },
});

function transformExpense(expense) {
    const friendIds = expense.members.filter(member => member !== 'You');

    // Return an array of expenses, one for each friend
    return friendIds.map((friendId, index) => {
        const splitAmount = expense.amount * (parseFloat(expense.splitPercentages[friendId]) / 100);
        return {
            id: `${expense.id}-${index}`,  // Unique ID for each friend's expense
            friendId: friendId,
            date: expense.date,
            description: expense.description,
            amount: splitAmount,
            type: 'lent'
        };
    });
}

export const { addExpense, settleExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
