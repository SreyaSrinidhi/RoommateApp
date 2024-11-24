import { createSlice } from '@reduxjs/toolkit';
import uuid from "react-native-uuid";

// Initial state with example categories and tasks
const initialState = {
    categories: [
        {
            name: 'Work',
            tasks: [
                {
                    id: '1',
                    name: 'Submit report',
                    description: 'Submit the annual report by 5 PM.',
                    assignedTo: 'You',
                    deadline: '2024-12-01',
                    status: 'pending',
                },
            ],
        },
        {
            name: 'Personal',
            tasks: [
                {
                    id: '2',
                    name: 'Buy groceries',
                    description: 'Pick up milk, eggs, and bread.',
                    assignedTo: 'You',
                    deadline: '2024-12-05',
                    status: 'pending',
                },
            ],
        },
    ],
};

const taskBoardSlice = createSlice({
    name: 'taskBoard',
    initialState,
    reducers: {
        // Add a new task to a category
        addTask: (state, action) => {
            const { categoryName, task } = action.payload;
            const category = state.categories.find((cat) => cat.name === categoryName);

            if (category) {
                category.tasks.push({
                    ...task,
                    id: uuid.v4(), // Generate a unique ID
                    status: 'pending', // Default status
                });
            } else {
                console.warn(`Category ${categoryName} not found.`);
            }
        },

        // Edit an existing task
        editTask: (state, action) => {
            const { categoryName, taskId, updatedTask } = action.payload;
            const category = state.categories.find((cat) => cat.name === categoryName);

            if (category) {
                const taskIndex = category.tasks.findIndex((task) => task.id === taskId);

                if (taskIndex !== -1) {
                    category.tasks[taskIndex] = {
                        ...category.tasks[taskIndex],
                        ...updatedTask, // Update task details
                    };
                } else {
                    console.warn(`Task with ID ${taskId} not found in category ${categoryName}.`);
                }
            } else {
                console.warn(`Category ${categoryName} not found.`);
            }
        },

        // Delete a task from a category
        deleteTask: (state, action) => {
            const { categoryName, taskId } = action.payload;
            const category = state.categories.find((cat) => cat.name === categoryName);

            if (category) {
                category.tasks = category.tasks.filter((task) => task.id !== taskId);
            } else {
                console.warn(`Category ${categoryName} not found.`);
            }
        },

        // Add a new category
        addCategory: (state, action) => {
            const { categoryName } = action.payload;

            if (!state.categories.find((cat) => cat.name.toLowerCase() === categoryName.toLowerCase())) {
                state.categories.push({
                    name: categoryName,
                    tasks: [], // Initialize with an empty task array
                });
            } else {
                console.warn(`Category "${categoryName}" already exists.`);
            }
        },

        // Delete a category and all its tasks
        deleteCategory: (state, action) => {
            const { categoryName } = action.payload;

            state.categories = state.categories.filter((cat) => cat.name !== categoryName);
        },

        // Toggle task status between 'done' and 'pending'
        toggleTaskStatus: (state, action) => {
            const { categoryName, taskId } = action.payload;
            const category = state.categories.find((cat) => cat.name === categoryName);

            if (category) {
                const task = category.tasks.find((task) => task.id === taskId);

                if (task) {
                    task.status = task.status === 'done' ? 'pending' : 'done';
                } else {
                    console.warn(`Task with ID ${taskId} not found in category ${categoryName}.`);
                }
            } else {
                console.warn(`Category ${categoryName} not found.`);
            }
        },
    },
});

// Export actions
export const {
    addTask,
    editTask,
    deleteTask,
    addCategory,
    deleteCategory,
    toggleTaskStatus,
} = taskBoardSlice.actions;

// Export the reducer
export default taskBoardSlice.reducer;
