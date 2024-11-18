import React, { useEffect } from 'react';
import { Alert } from 'react-native'
import { screen, render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FriendsStackWithProvider from '../src/Pages/Expenses'
import FriendsScreen from '../src/Pages/Expenses/Pages/FriendsPage';
import { ExpensesProvider, useExpenses } from '../src/Pages/Expenses/Context';
import Tabs from '../src/Components/Tabs';

const mockStore = configureStore([]);
const initialState = {
    emergency: {},
    user: { id: '123' },
    calendar: {},
    expenses: {
        friends: [
            {id:'18', name: 'Virat Kohli'},
            {id: '2', name: "Sunil Gavaskar"},
            {id:"10", name: "Sachin Tendulkar"},
            {id:"45", name: "Rohit Sharma"},
            {id:'7', name: 'MS Dhoni'},
        ],
        expenses: [
            { id: '1', friendId: '18', date: 'Mar 18', description: "Ellie's bakery", amount: 51.36, type: 'borrowed' },
            { id: '4', friendId: '18', date: 'Mar 18', description: "Ben Stokes", amount: 21.36, type: 'borrowed' },
            { id: '2', friendId: '10', date: 'Mar 10', description: 'Fuel up', amount: 24.03, type: 'lent' },
            { id: '3', friendId: '45', date: 'Mar 06', description: 'Movie night', amount: 2.5, type: 'lent' },
        ],
    },    
};

const store = mockStore(initialState);

// Mocking navigation for testing
const mockNavigation = {
    setOptions: jest.fn(),
    getState: jest.fn().mockReturnValue({
        routes: [{ name: 'Friends' }],  // Customize this based on your stack
        index: 0,
    }),
    navigate: jest.fn(),
    goBack: jest.fn(),
};

// Mock dispatch to track if it's called
const mockDispatch = jest.fn();

//mock the Alert.alert function for checking login fail alerts
jest.spyOn(Alert, 'alert')

const renderWithRedux = (component, { initialState, store = mockStore(initialState) } = {}) => {
    store.dispatch = mockDispatch;  // Pass in mocked dispatch

    return render(
        <Provider store={store}>
            <ExpensesProvider>
                {React.cloneElement(component, { navigation: mockNavigation })}
            </ExpensesProvider>
        </Provider>
    );
};

// TestComponent to set navigation and perform side-effects (e.g., logging)
const TestComponent = ({ component }) => {
    const { setParentNavigation } = useExpenses();

    useEffect(() => {
        setParentNavigation(mockNavigation);  // Set the mock navigation object
    }, [setParentNavigation]);

    return component;  // Directly return the passed component
};

describe('SE-1: Attempt to create a new transaction', () => {
    test('filler test ', async () => {
        
    });
})

describe('SE-2: Attempt to add roommates that are in the group', () => {

})

describe('SE-3: Attempt to add roommates that are not in the group to the transaction', () => {

})

describe('SE-4: Attempt to get total amount each relevant roommates owes based on percentages', () => {

})

describe('SE-5: Attempt to assign numeric amounts each relevant roommate owes the person making the transaction', () => {

})

describe('SE-6: Attempt to post the transaction', () => {

})

describe('SE-7: Attempt to edit existing transaction that is not made by the user', () => {

})

describe('SE-8: Attempt to edit existing transaction that is made by the user', () => {

})

describe('SE-9: Attempt to delete a transaction that is not made by the user', () => {

})

describe('SE-10: Attempt to delete a transaction that is made by the user', () => {

})

describe('SE-11: Attempt to recalculate the final balance if a transaction is marked as paid', () => {

})

describe('SE-12: Attempt to mark balance between two roommates as paid', () => {

})