import React, { createContext, useState, useContext } from 'react';

const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
    const [parentNavigation, setParentNavigation] = useState(null); // Navigation object

    return (
        <ExpensesContext.Provider
            value={{
                parentNavigation,
                setParentNavigation
            }}
        >
            {children}
        </ExpensesContext.Provider>
    );
};

export const useExpenses = () => {
    return useContext(ExpensesContext);
};
