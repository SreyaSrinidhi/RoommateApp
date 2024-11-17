import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { NavigationContainer } from '@react-navigation/native';
import CalendarPage from '../src/Pages/Calander';
import CalendarWidget from '../src/Pages/Calander/PageLayout/Components/CalendarWidget';
import { CalendarProvider } from '../src/Pages/Calander/Context';
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
                <CalendarProvider>
                    <NavigationContainer>
                        <CalendarPage navigation={mockNavigation} />
                    </NavigationContainer>
                </CalendarProvider>
            </Provider>
        );

        expect(getByText('No tasks for the selected date.')).toBeTruthy();
    });

    test('renders CalendarWidget with marked dates', () => {
        const store = mockStore(initialState);

        const { getByText } = render(
            <Provider store={store}>
                <CalendarProvider>
                    <CalendarWidget />
                </CalendarProvider>
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
        const store = mockStore(initialState);

        const { getByText } = render(
            <Provider store={store}>
                <CalendarProvider>
                    <CalendarWidget />
                </CalendarProvider>
            </Provider>
        );

        await act(async () => {
            fireEvent.press(getByText('17'));
        });

        expect(getByText('17')).toBeTruthy();
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
});
