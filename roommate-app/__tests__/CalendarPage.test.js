import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native'; // For rendering components and simulating events
import { Provider } from 'react-redux'; // Redux Provider for the store
import configureStore from 'redux-mock-store'; // Mock Redux store for testing
import { NavigationContainer } from '@react-navigation/native'; // Navigation container for testing components with navigation
import CalendarPage from '../src/Pages/Calander'; // Main Calendar page
import CalendarWidget from '../src/Pages/Calander/PageLayout/Components/CalendarWidget'; // Calendar Widget component
import AddEventModal from '../src/Pages/Calander/PageLayout/Components/AddEventModal'; // Add Event Modal component
import CalendarEventModal from '../src/Pages/Calander/PageLayout/Components/CalendarEventModal'; // Calendar Event Modal component
import Layout from '../src/Pages/Calander/PageLayout'; // Layout component with sections and modals
import { CalendarContext } from '../src/Pages/Calander/Context'; // Calendar Context for sharing state between components
import calendarReducer, { addTask, deleteTask, editTask } from '../src/StateManagement/Slices/CalendarSlice'; // Redux reducers and actions
import { Text } from 'react-native'; // React Native Text component for rendering text in tests

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
        const mockSetSelectedDate = jest.fn();
        const store = mockStore(initialState);

        const { getByText } = render(
            <Provider store={store}>
                <CalendarContext.Provider
                    value={{
                        selectedDate: '2024-11-17',
                        setSelectedDate: mockSetSelectedDate,
                    }}
                >
                    <CalendarWidget />
                </CalendarContext.Provider>
            </Provider>
        );

        await act(async () => {
            fireEvent.press(getByText('17'));
        });

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

        expect(queryByTestId('AddEventModal')).toBeTruthy();

        fireEvent.changeText(getByPlaceholderText('Title'), 'New Event');
        fireEvent.changeText(getByPlaceholderText('Description'), 'Event Description');
        fireEvent.changeText(getByPlaceholderText('Due Time'), '12:00 PM');
        fireEvent.press(getByText('Add'));

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

        expect(mockSetIsAddEventModalVisible).toHaveBeenCalledWith(false);
    });

    // Integrated CalendarEventModal Tests
    describe('CalenderEventModal Tests', () => {
        let mockSetSelectedTask;

        beforeEach(() => {
            store = mockStore(initialState);
            store.dispatch = jest.fn();
            mockSetSelectedTask = jest.fn();
        });

        test('renders correctly when task is undefined', () => {
            const { queryByText, queryByPlaceholderText } = render(
                <Provider store={store}>
                    <CalendarContext.Provider
                        value={{
                            selectedTask: null,
                            selectedDate: '2024-10-17',
                            setSelectedTask: mockSetSelectedTask,
                        }}
                    >
                        <CalendarEventModal />
                    </CalendarContext.Provider>
                </Provider>
            );

            expect(queryByText('Edit Event')).toBeNull();
            expect(queryByPlaceholderText('Title')).toBeNull();
        });

        test('renders task details correctly when task is provided', () => {
            const mockTask = {
                id: 1,
                title: 'Mock Task',
                description: 'Mock Description',
                due: '10:00 AM',
            };

            const { getByText } = render(
                <Provider store={store}>
                    <CalendarContext.Provider
                        value={{
                            selectedTask: mockTask,
                            selectedDate: '2024-10-17',
                            setSelectedTask: mockSetSelectedTask,
                        }}
                    >
                        <CalendarEventModal />
                    </CalendarContext.Provider>
                </Provider>
            );

            expect(getByText('Mock Task')).toBeTruthy();
            expect(getByText('Mock Description')).toBeTruthy();
            expect(getByText('10:00 AM')).toBeTruthy();
        });

        test('handles edit functionality correctly', () => {
            const mockTask = {
                id: 1,
                title: 'Mock Task',
                description: 'Mock Description',
                due: '10:00 AM',
            };

            const { getByText, getByDisplayValue } = render(
                <Provider store={store}>
                    <CalendarContext.Provider
                        value={{
                            selectedTask: mockTask,
                            selectedDate: '2024-10-17',
                            setSelectedTask: mockSetSelectedTask,
                        }}
                    >
                        <CalendarEventModal />
                    </CalendarContext.Provider>
                </Provider>
            );

            fireEvent.press(getByText('Edit'));
            const titleInput = getByDisplayValue('Mock Task');
            const descriptionInput = getByDisplayValue('Mock Description');
            const dueInput = getByDisplayValue('10:00 AM');

            fireEvent.changeText(titleInput, 'Updated Task Title');
            fireEvent.changeText(descriptionInput, 'Updated Task Description');
            fireEvent.changeText(dueInput, '11:00 AM');
            fireEvent.press(getByText('Save'));

            expect(store.dispatch).toHaveBeenCalledWith(
                editTask({
                    date: '2024-10-17',
                    taskId: mockTask.id,
                    updatedTask: {
                        title: 'Updated Task Title',
                        description: 'Updated Task Description',
                        due: '11:00 AM',
                    },
                })
            );

            expect(mockSetSelectedTask).toHaveBeenCalledWith(null);
        });

        test('handles delete functionality correctly', () => {
            const mockTask = {
                id: 1,
                title: 'Mock Task',
                description: 'Mock Description',
                due: '10:00 AM',
            };

            const { getByText } = render(
                <Provider store={store}>
                    <CalendarContext.Provider
                        value={{
                            selectedTask: mockTask,
                            selectedDate: '2024-10-17',
                            setSelectedTask: mockSetSelectedTask,
                        }}
                    >
                        <CalendarEventModal />
                    </CalendarContext.Provider>
                </Provider>
            );

            fireEvent.press(getByText('Delete'));

            expect(store.dispatch).toHaveBeenCalledWith(
                deleteTask({
                    date: '2024-10-17',
                    taskId: mockTask.id,
                })
            );

            expect(mockSetSelectedTask).toHaveBeenCalledWith(null);
        });
    });
    describe('Layout Component Tests', () => {
        test('renders Layout with children correctly', () => {
            const { getByText } = render(
                <Layout>
                    <Text>Child Component</Text>
                </Layout>
            );

            expect(getByText('Child Component')).toBeTruthy();
        });

        test('renders ScrollSection with children correctly', () => {
            const { getByText } = render(
                <Layout.ScrollSection>
                    <Text>Scroll Section Child</Text>
                </Layout.ScrollSection>
            );

            expect(getByText('Scroll Section Child')).toBeTruthy();
        });

        test('renders CalendarSection with children correctly', () => {
            const { getByText } = render(
                <Layout.CalendarSection>
                    <Text>Calendar Section Child</Text>
                </Layout.CalendarSection>
            );

            expect(getByText('Calendar Section Child')).toBeTruthy();
        });

        describe('ExpandEventModal Tests', () => {
            let mockSetSelectedTask;

            beforeEach(() => {
                mockSetSelectedTask = jest.fn();
            });

            test('does not render ExpandEventModal when no selected task', () => {
                const { queryByTestId } = render(
                    <CalendarContext.Provider
                        value={{
                            selectedTask: null,
                            setSelectedTask: mockSetSelectedTask,
                        }}
                    >
                        <Layout.ExpandEventModal>
                            <Text>Expand Event Content</Text>
                        </Layout.ExpandEventModal>
                    </CalendarContext.Provider>
                );

                expect(queryByTestId('Modal')).toBeNull();
            });

            test('renders ExpandEventModal when task is selected', () => {
                const { getByText } = render(
                    <CalendarContext.Provider
                        value={{
                            selectedTask: { id: 1, title: 'Mock Task' },
                            setSelectedTask: mockSetSelectedTask,
                        }}
                    >
                        <Layout.ExpandEventModal>
                            <Text>Expand Event Content</Text>
                        </Layout.ExpandEventModal>
                    </CalendarContext.Provider>
                );

                expect(getByText('Expand Event Content')).toBeTruthy();
            });


        });

        describe('AddEventModal Tests', () => {
            let mockSetIsAddEventModalVisible;

            beforeEach(() => {
                mockSetIsAddEventModalVisible = jest.fn();
            });



            test('sets header button correctly in AddEventModal', () => {
                const mockNavigation = { setOptions: jest.fn() };

                render(
                    <CalendarContext.Provider
                        value={{
                            isAddEventModalVisible: false,
                            setIsAddEventModalVisible: mockSetIsAddEventModalVisible,
                        }}
                    >
                        <Layout.AddEventModal navigation={mockNavigation}>
                            <Text>Add Event Content</Text>
                        </Layout.AddEventModal>
                    </CalendarContext.Provider>
                );

                expect(mockNavigation.setOptions).toHaveBeenCalledWith(
                    expect.objectContaining({
                        headerRight: expect.any(Function),
                    })
                );
            });
        });
    });


});
