import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { NavigationContainer } from '@react-navigation/native';
import CalendarPage from '../src/Pages/Calander';
import CalendarWidget from '../src/Pages/Calander/PageLayout/Components/CalendarWidget';
import AddEventModal from '../src/Pages/Calander/PageLayout/Components/AddEventModal';
import { CalendarContext } from '../src/Pages/Calander/Context';
import calendarReducer, { addTask, deleteTask } from '../src/StateManagement/Slices/CalendarSlice';

// Mock Redux store
const mockStore = configureStore([]);
const initialState = {
    calendar: {
        tasks: {
            '2024-10-17': [
                { id: 1, title: 'Task 1', description: 'Desc 1', due: '11:59 PM', created: 'User X' },
            ],
        },
    },
};

// Mock navigation
const mockNavigation = {
    setOptions: jest.fn(),
};

describe('Calendar Tests - Updated', () => {
    test('renders CalendarPage correctly', () => {
        const store = mockStore(initialState);

        const { getByText } = render(
            <Provider store={store}>
                <CalendarContext.Provider value={{}}>
                    <NavigationContainer>
                        <CalendarPage navigation={mockNavigation} />
                    </NavigationContainer>
                </CalendarContext.Provider>
            </Provider>
        );

        expect(getByText('No tasks for the selected date.')).toBeTruthy();
    });

    test('renders CalendarWidget with marked dates', () => {
        const store = mockStore(initialState);

        const { getByText } = render(
            <Provider store={store}>
                <CalendarContext.Provider value={{}}>
                    <CalendarWidget />
                </CalendarContext.Provider>
            </Provider>
        );

        expect(getByText('17')).toBeTruthy();
    });

    test('addTask adds a task to a new date', () => {
        const newTask = { title: 'New Task', description: 'New Desc', due: '1:00 PM' };
        const date = '2024-10-18';
        const action = addTask({ date, task: newTask });

        const initialState = { tasks: {} };
        const updatedState = calendarReducer(initialState, action);

        expect(updatedState.tasks[date]).toHaveLength(1);
        expect(updatedState.tasks[date][0].title).toBe('New Task');
    });

    test('deleteTask removes a task from the state', () => {
        const action = deleteTask({ date: '2024-10-17', taskId: 1 });

        const stateWithTask = {
            tasks: {
                '2024-10-17': [{ id: 1, title: 'Task 1' }],
            },
        };

        const updatedState = calendarReducer(stateWithTask, action);

        expect(updatedState.tasks['2024-10-17']).toBeUndefined();
    });

    test('selecting a date triggers onDayPress', async () => {
        const mockSetSelectedDate = jest.fn(); // Mock implementation for setSelectedDate
        const store = mockStore(initialState);

        const { getByText } = render(
            <Provider store={store}>
                <CalendarContext.Provider
                    value={{
                        selectedDate: '2024-11-17', // Ensure this matches the calendar's initial date
                        setSelectedDate: mockSetSelectedDate, // Mock the function here
                    }}
                >
                    <CalendarWidget />
                </CalendarContext.Provider>
            </Provider>
        );

        // Simulate pressing the date "17"
        await act(async () => {
            fireEvent.press(getByText('17'));
        });

        // Verify that setSelectedDate was called with "2024-11-17"
        expect(mockSetSelectedDate).toHaveBeenCalledWith('2024-11-17');
    });


    test('handles adding tasks to multiple dates', () => {
        const initialState = {
            tasks: {
                '2024-10-17': [{ id: 1, title: 'Task 1' }],
            },
        };

        const newTask = { title: 'New Task', description: 'New Desc', due: '2:00 PM' };
        const action = addTask({ date: '2024-10-18', task: newTask });

        const updatedState = calendarReducer(initialState, action);

        expect(updatedState.tasks['2024-10-17']).toHaveLength(1);
        expect(updatedState.tasks['2024-10-18']).toHaveLength(1);
        expect(updatedState.tasks['2024-10-18'][0].title).toBe('New Task');
    });

    test('AddEventModal renders and submits correctly', async () => {
        const mockSetIsAddEventModalVisible = jest.fn();
        const mockSelectedDate = '2024-10-17';
        const store = mockStore(initialState);

        const { getByText, getByPlaceholderText, queryByTestId } = render(
            <Provider store={store}>
                <CalendarContext.Provider
                    value={{
                        selectedDate: mockSelectedDate,
                        setIsAddEventModalVisible: mockSetIsAddEventModalVisible,
                    }}
                >
                    <AddEventModal />
                </CalendarContext.Provider>
            </Provider>
        );

        // Check if modal is rendered
        expect(queryByTestId('AddEventModal')).toBeTruthy();

        // Fill form fields
        fireEvent.changeText(getByPlaceholderText('Title'), 'New Event');
        fireEvent.changeText(getByPlaceholderText('Description'), 'Event Description');
        fireEvent.changeText(getByPlaceholderText('Due Time'), '12:00 PM');

        // Submit the form
        fireEvent.press(getByText('Add'));

        // Verify actions were dispatched
        expect(store.getActions()).toContainEqual(
            expect.objectContaining({
                type: 'calendar/addTask',
                payload: {
                    date: mockSelectedDate,
                    task: expect.objectContaining({
                        title: 'New Event',
                        description: 'Event Description',
                        due: '12:00 PM',
                    }),
                },
            })
        );

        // Verify modal is closed
        expect(mockSetIsAddEventModalVisible).toHaveBeenCalledWith(false);
    });
});
