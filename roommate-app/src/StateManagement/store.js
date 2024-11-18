import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './Slices/CalendarSlice';
import userReducer from './Slices/UserSlice';
import emergencyReducer from './Slices/EmergencyButtonSlice'
import ExpensesReducer  from "./Slices/ExpensesSlice";

// initial state for testing purposes
export const initialState = {
    user: { id: null }, // Default to no user logged in
    calendar: {}, // Default calendar state
    //add emergency button for testing here??
};

// simple root reducer for testing
export const rootReducer = {
    user: userReducer,
    calendar: calendarReducer,
    emergency: emergencyReducer,
};

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
