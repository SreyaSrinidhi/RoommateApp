import React from 'react';
import { render, fireEvent, act, waitFor, screen} from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';  //needed to mock redux store
import HomePage from '../src/Pages/HomePage'; 
import Tabs from '../src/Components/Tabs'
import Calendar from '../src/Pages/Calander'

// Define a mock reducer for mocking store
const mockReducer = {
    user: (state = { id: null }, action) => state, // simple reducer for 'user'
    calendar: (state = {}, action) => state, // simple reducer for 'calendar'
    emergency: (state = {}, action) => state, // simple reducer for 'emergency'
    expenses: (state = {}, action) => state, // simple reducer for 'expenses
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
                calendar: {
                    tasks: {
                        '2024-10-17': [
                            { id: 1, title: 'Task 1', description: 'Desc 1', due: '11:59 PM', created: 'User X' },
                        ],
                    },
                },
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
                }
            },
        });
    });

    test('Pressing Calendar Tile navigates to calendar page', async () => {
        const { getByTestId, findByText } = render(
            <Provider store={mockedStore}>
                <Tabs pagesList={pagesList} />
            </Provider>
        );

        //find the calendar tile and simulate a press
        const calendarTile = getByTestId('calendar-tile'); // Use the testID to find the element

        fireEvent.press(calendarTile);   //simulate clicking on tile

         // Wait for the Calendar page to be rendered (make sure the text exists)
        await waitFor(() => {
            expect(screen.getByTestId('calendar-main-page')).toBeTruthy();
        });
    })

    test('Pressing updates tile opens updates widget', async () => {
        const { findByText } = render(
            <Provider store={mockedStore}>
                <Tabs pagesList={pagesList} />
            </Provider>
        );

        //find the updates tile and simulate press 
        const updatesTile = await findByText('Click me to see updates');   //not sure why this needs await while other above doesn't...

        fireEvent.press(updatesTile)

        //assert that the updates modal is displayed
        const updatesModalTitle = await screen.findByText('Updates:');  //NOTE - text sensitive - if this component changes, this text must change
        expect(updatesModalTitle).toBeTruthy();


    })

    test('Pressing unassigned tile does nothing', () => {
        const { getByTestId } = render(
            <Provider store={mockedStore}>
                <Tabs pagesList={pagesList} />
            </Provider>
        );

        blank1 = getByTestId('blank-tile-1');
        blank2 = getByTestId('blank-tile-2');
        blank3 = getByTestId('blank-tile-3');
        blank4 = getByTestId('blank-tile-4')
        
        //press each tile
        fireEvent.press(blank1);
        fireEvent.press(blank2);
        fireEvent.press(blank3);
        fireEvent.press(blank4);

        //assert page still rendered the same
        // Check if the clickable tile for updates is rendered
        expect(getByTestId('updates-tile')).toBeTruthy();
        // Check if the tile for navigating to the Calendar is rendered
        expect(getByTestId('calendar-tile')).toBeTruthy();
    })

})