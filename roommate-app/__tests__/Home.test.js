import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../src/StateManagement/store'; 
import { configureStore } from '@reduxjs/toolkit';  //needed to mock redux store
import { NavigationContainer } from '@react-navigation/native'; // needed to mock page navigation since HomePage uses navigation hook
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from '../src/Pages/HomePage'; 
import Tabs from '../src/Components/Tabs'
import { Calendar } from 'react-native-calendars';

//tests to see if page rendered correctly - NOT FUNCTIONAL TESTING
describe('HomePage Render Tests', () => {
    //rendering tests
    test('renders tiles', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <NavigationContainer> 
                    <HomePage />
                </NavigationContainer>
            </Provider>
        );

        // Check if the clickable tile for updates is rendered
        expect(getByTestId('updates-tile')).toBeTruthy();
        // Check if the tile for navigating to the Calendar is rendered
        expect(getByTestId('calendar-tile')).toBeTruthy();
    })
})


//****FUNCTIONAL TESTS BELOW***********
// Define a mock reducer for mocking store
const mockReducer = {
    user: (state = { id: null }, action) => state, // simple reducer for 'user'
    calendar: (state = {}, action) => state, // simple reducer for 'calendar'
    emergency: (state = {}, action) => state, // simple reducer for 'emergency'
};
//mock pagesList for navigation
const pagesList = [
    { name: 'Home', component: HomePage },
    { name: 'Calendar', component: Calendar },
    // Add other pages as needed
];

describe('HP-1: Navigate to Page from Tile', () => {
    let mockedStore;  //define a store for our mock

    beforeEach(() => {
        //initialize mocked store with logged in
        mockedStore = configureStore({
            reducer: mockReducer,  //pass the mock reducer
            preloadedState: {
                user: { id: 'test-user-id'}, //NOTE - for now without authentication, this will work - post auth, may need to be changed
            },
        });
    });

    test('HP-1: Navigates to page when clicking on a tile', async () => {
        const { getByTestId, findByText } = render(
            <Provider store={mockedStore}>
                <Tabs pagesList={pagesList} />
            </Provider>
        );

        //find the calendar tile and simulate a press
        const calendarTile = getByTestId('calendar-tile'); // Use the testID to find the element
        fireEvent.press(calendarTile);   //simulate clicking on tile

        //assert that the Calendar page is displayed by checking for a specific content on that page
        const calendarPageTitle = findByText(/Calendar/i);
        expect(calendarPageTitle).toBeTruthy()
    })
})