import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Task from "../src/Pages/Calander/PageLayout/Components/Tasks/index";
import AddEventModal from "../src/Pages/Calander/PageLayout/Components/AddEventModal/index";
import { CalendarContext } from "../src/Pages/Calander/Context";

const mockStore = configureStore([]);
const initialState = {
    calendar: {
        tasks: {
            "2024-10-17": [
                {
                    id: 1,
                    title: "PHYS 121 Labs",
                    subtitle: "Lab #4: COL",
                    description: "Complete the lab report for COL",
                    due: "Due at 11:59 PM",
                    created: "User X",
                },
            ],
        },
    },
};
const store = mockStore(initialState);

describe("Calendar Page Tests", () => {
    const mockSetSelectedTask = jest.fn();
    const mockSetIsAddEventModalVisible = jest.fn();

    const mockContextValue = {
        selectedDate: "2024-10-17",
        setSelectedTask: mockSetSelectedTask,
        setIsAddEventModalVisible: mockSetIsAddEventModalVisible,
    };

    it("renders tasks correctly for a selected date", () => {
        const { getByTestId, queryByText } = render(
            <Provider store={store}>
                <CalendarContext.Provider value={mockContextValue}>
                    <Task />
                </CalendarContext.Provider>
            </Provider>
        );

        expect(getByTestId("task-1")).toBeTruthy();
        expect(queryByText("PHYS 121 Labs")).toBeTruthy();
    });

    it("shows 'No tasks' message when no tasks are present for the selected date", () => {
        const emptyStore = mockStore({ calendar: { tasks: {} } });

        const { queryByText } = render(
            <Provider store={emptyStore}>
                <CalendarContext.Provider value={{ ...mockContextValue, selectedDate: "2024-10-18" }}>
                    <Task />
                </CalendarContext.Provider>
            </Provider>
        );

        expect(queryByText("No tasks for the selected date.")).toBeTruthy();
    });

    it("opens the Add Event modal and adds a new task", () => {
        const mockDispatch = jest.fn();
        store.dispatch = mockDispatch;

        const { getByPlaceholderText, getByText } = render(
            <Provider store={store}>
                <CalendarContext.Provider value={mockContextValue}>
                    <AddEventModal />
                </CalendarContext.Provider>
            </Provider>
        );

        fireEvent.changeText(getByPlaceholderText("Title"), "New Task");
        fireEvent.changeText(getByPlaceholderText("Description"), "New Description");
        fireEvent.changeText(getByPlaceholderText("Due Time"), "5 PM");
        fireEvent.press(getByText("Add"));

        expect(mockDispatch).toHaveBeenCalledWith({
            type: "calendar/addTask",
            payload: {
                date: "2024-10-17",
                task: {
                    id: expect.any(String),
                    title: "New Task",
                    description: "New Description",
                    due: "5 PM",
                    created: "User X",
                },
            },
        });
    });

    it("edits an existing task", () => {
        const mockDispatch = jest.fn();
        store.dispatch = mockDispatch;

        const { getByTestId, getByText } = render(
            <Provider store={store}>
                <CalendarContext.Provider value={mockContextValue}>
                    <Task />
                </CalendarContext.Provider>
            </Provider>
        );

        fireEvent.press(getByTestId("edit-task-1")); // Open edit mode
        fireEvent.changeText(getByTestId("edit-task-title"), "Updated Task"); // Edit the title
        fireEvent.press(getByTestId("save-task")); // Save the changes

        expect(mockDispatch).toHaveBeenCalledWith({
            type: "calendar/editTask",
            payload: {
                date: "2024-10-17",
                taskId: 1,
                updatedTask: { title: "Updated Task" },
            },
        });
    });

    it("deletes a task", () => {
        const mockDispatch = jest.fn();
        store.dispatch = mockDispatch;

        const { getByTestId } = render(
            <Provider store={store}>
                <CalendarContext.Provider value={mockContextValue}>
                    <Task />
                </CalendarContext.Provider>
            </Provider>
        );

        fireEvent.press(getByTestId("delete-task-1")); // Simulate task deletion

        expect(mockDispatch).toHaveBeenCalledWith({
            type: "calendar/deleteTask",
            payload: { date: "2024-10-17", taskId: 1 },
        });
    });

    it("updates tasks when selectedDate changes", () => {
        const updatedContextValue = {
            ...mockContextValue,
            selectedDate: "2024-10-18", // A date with no tasks
        };

        const { queryByText } = render(
            <Provider store={store}>
                <CalendarContext.Provider value={updatedContextValue}>
                    <Task />
                </CalendarContext.Provider>
            </Provider>
        );

        expect(queryByText("PHYS 121 Labs")).toBeFalsy(); // The task should not appear
        expect(queryByText("No tasks for the selected date.")).toBeTruthy();
    });
});
