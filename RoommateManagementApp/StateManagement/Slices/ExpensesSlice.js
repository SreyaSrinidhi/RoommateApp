import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase.config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

// Fetch expenses for a specific group
export const fetchExpensesByGroup = createAsyncThunk('expenses/fetchExpensesByGroup', async (groupId) => {
    const expenses = [];
    const expensesCollection = collection(db, `groups/${groupId}/expenses`);
    const snapshot = await getDocs(expensesCollection);
    snapshot.forEach((doc) => {
        expenses.push({ id: doc.id, ...doc.data() });
    });
    return expenses;
});

// Add an expense to a group
export const addExpense = createAsyncThunk('expenses/addExpense', async ({ groupId, expense }) => {
    const docRef = await addDoc(collection(db, `groups/${groupId}/expenses`), expense);
    return { id: docRef.id, ...expense };
});

// Delete an expense from a group
export const deleteExpense = createAsyncThunk('expenses/deleteExpense', async ({ groupId, expenseId }) => {
    await deleteDoc(doc(db, `groups/${groupId}/expenses/${expenseId}`));
    return expenseId;
});

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: {
        expenses: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpensesByGroup.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchExpensesByGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = action.payload;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.expenses.push(action.payload);
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
            });
    },
});

export default expensesSlice.reducer;
