import {Calendar} from "react-native-calendars";
import React, {useContext,} from "react";
import {CalendarContext} from "../../../Context";
import {useSelector} from "react-redux";


const CalendarWidget = ()=>{
    const {tasks} = useSelector(state => state.calendar);

    const { selectedDate, setSelectedDate } = useContext(CalendarContext);

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    const getMarkedDates = () => {
        const marked = {};

        // Mark dates with tasks and show up to 4 dots
        if (tasks != null) {                                   //ensure tasks is not null before iterating through
            Object.keys(tasks).forEach(date => {
                const dots = tasks[date].slice(0, 4).map((_, i) => ({
                    key: `dot-${i}`,
                    color: '#4A154B', // Dot color for tasks
                }));

                marked[date] = {
                    dots, // Add dots for dates with tasks
                    ...(marked[date] || {}),
                };
            });
        }

        // Highlight the selected date with a circle but preserve the dots
        if (selectedDate) {
            marked[selectedDate] = {
                ...marked[selectedDate], // Preserve existing dots
                selected: true,
                selectedColor: '#2BAC76', // Circle color for selected day
            };
        }

        return marked;
    };

    return(
        <Calendar
            style={{ backgroundColor: '#EDEFF7', borderRadius: 10, marginBottom: 10 }}
            theme={{
                calendarBackground: '#EDEFF7',
                textSectionTitleColor: '#2BAC76',
                selectedDayBackgroundColor: '#2BAC76',
                selectedDayTextColor: '#FFFFFF',
                todayTextColor: '#2BAC76',
                dayTextColor: '#4A154B',
                arrowColor: '#4A154B',
                monthTextColor: '#4A154B',
                textDisabledColor: '#D0D1D2',
                dotColor: '#4A154B',
                selectedDotColor: '#4A154B',
            }}
            onDayPress={onDayPress}
            markedDates={getMarkedDates()} // Pass marked dates with dots and selection
            markingType={'multi-dot'} // Enable multi-dot marking type
        />
    )
}

export default CalendarWidget;