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
            const newExpense = {
                ...action.payload,
                id: `${Date.now()}`,
            };
            state.expenses.push(transformExpense(newExpense));
        },
        settleExpense: (state, action) => {
            const { expenseId } = action.payload;
            state.expenses = state.expenses.filter(expense => expense.id !== expenseId);
        },
    },
});

function transformExpense(expense) {
    const friendId = expense.members.find(member => member !== 'You');
    const splitAmount = expense.amount * (parseFloat(expense.splitPercentages[friendId]) / 100);

    return {
        id: expense.id,
        friendId: friendId,
        date: expense.date,
        description: expense.description,
        amount: splitAmount,
        type: 'lent'
    };
}

export const { addExpense, settleExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
