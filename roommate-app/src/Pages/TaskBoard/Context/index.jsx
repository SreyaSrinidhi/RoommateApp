import React, { createContext, useState } from 'react';

export const TaskBoardContext = createContext();

export const TaskBoardProvider = ({ children }) => {
    const [categories, setCategories] = useState([
        {
            name: 'Work',
            tasks: [
                {
                    id: '1',
                    name: 'Submit report',
                    description: 'Submit the quarterly report to the manager.',
                    assignedTo: 'You',
                    deadline: '2024-11-30',
                    status: 'pending', // Status can be 'pending' or 'done'
                },
            ],
        },
        {
            name: 'Personal',
            tasks: [
                {
                    id: '2',
                    name: 'Buy groceries',
                    description: 'Buy milk, eggs, and bread.',
                    assignedTo: 'You',
                    deadline: '2024-11-25',
                    status: 'pending',
                },
            ],
        },
    ]);
    const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);

    return (
        <TaskBoardContext.Provider
            value={{
                categories,
                setCategories,
                isAddCategoryModalVisible,
                setIsAddCategoryModalVisible,
            }}
        >
            {children}
        </TaskBoardContext.Provider>
    );
};
