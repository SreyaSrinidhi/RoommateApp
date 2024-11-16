// Create the CalendarContext
import {createContext, useState} from "react";
import {getTodayDate} from "../utils";

export const CalendarContext = createContext();

// Create a provider component
export const CalendarProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(getTodayDate());  // State for selected date
    const [selectedTask, setSelectedTask] = useState(null); // State for selected task
    const [isAddEventModalVisible, setIsAddEventModalVisible] = useState(false); // State for Add Event Modal

    return (
        <CalendarContext.Provider value={{ selectedDate, setSelectedDate, selectedTask, setSelectedTask, isAddEventModalVisible, setIsAddEventModalVisible }}>
            {children}
        </CalendarContext.Provider>
    );
};