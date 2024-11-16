import { createSlice } from '@reduxjs/toolkit';
import uuid from "react-native-uuid";


// Initial state with example tasks
const initialState = {
    tasks: {
        '2024-10-17': [
            { id: 1, title: 'PHYS 121 Labs', subtitle: 'Lab #4: COL', description: 'Complete the lab report for COL', due: 'Due at 11:59 PM', created: "User X" },
        ],
        '2024-10-24': [
            { id: 2, title: 'PHYS 122 Labs', subtitle: 'Lab #4: COL', description: 'Complete the lab report for COL', due: 'Due at 1:59 PM', created: "User Y" },
        ],
    }
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const { date, task } = action.payload;
            if (!state.tasks[date]) {
                state.tasks[date] = [];
            }
            state.tasks[date].push({
                ...task,
                id: uuid.v4(), // Ensure unique id
                created: "User X",
            });
        },

        editTask: (state, action) => {
            const { date, taskId, updatedTask } = action.payload;
            const taskIndex = state.tasks[date]?.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                state.tasks[date][taskIndex] = { ...state.tasks[date][taskIndex], ...updatedTask };
            }
        },
        deleteTask: (state, action) => {
            const { date, taskId } = action.payload;
            state.tasks[date] = state.tasks[date].filter(task => task.id !== taskId);
            if (state.tasks[date].length === 0) {
                delete state.tasks[date]; // Remove the date entry if no tasks are left
            }
        },
    }
});

export const { addTask, editTask, deleteTask } = calendarSlice.actions;

export default calendarSlice.reducer;
