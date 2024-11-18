import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './Slices/CalendarSlice';
import userReducer from './Slices/UserSlice';
import emergencyReducer from './Slices/EmergencyButtonSlice'
import ExpensesReducer  from "./Slices/ExpensesSlice";

//store configuration
export const store = configureStore({
    reducer: {
        user: userReducer,
        calendar: calendarReducer,
        emergency: emergencyReducer,
        expenses: ExpensesReducer,
        //recentActivity: recentActivityReducer   commented for now b/c still in planning, no real code written
    },
});
