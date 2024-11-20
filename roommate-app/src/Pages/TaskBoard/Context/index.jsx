import React, { createContext, useState } from 'react';

export const TaskBoardContext = createContext();

export const TaskBoardProvider = ({ children }) => {
    const [categories, setCategories] = useState([
        { name: 'Work', tasks: [{ id: '1', title: 'Submit report' }] },
        { name: 'Personal', tasks: [{ id: '2', title: 'Buy groceries' }] },
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
