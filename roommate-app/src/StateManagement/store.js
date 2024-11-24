import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './Slices/CalendarSlice';
import userReducer from './Slices/UserSlice';
import emergencyReducer from './Slices/EmergencyButtonSlice';
import expensesReducer from './Slices/ExpensesSlice';
import taskBoardReducer from './Slices/TaskBoardSlice'; // Import TaskBoardSlice

// Store configuration
export const store = configureStore({
    reducer: {
        user: userReducer,
        calendar: calendarReducer,
        emergency: emergencyReducer,
        expenses: expensesReducer,
        taskBoard: taskBoardReducer, // Add TaskBoard reducer
    },
});
