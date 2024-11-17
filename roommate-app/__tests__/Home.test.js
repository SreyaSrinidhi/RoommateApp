import React from 'react';
import { render, fireEvent, act} from '@testing-library/react-native';
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

    test('Pressing Calendar Tile navigates to calendar page', async () => {
        const { getByTestId, findByText } = render(
            <Provider store={mockedStore}>
                <Tabs pagesList={pagesList} />
            </Provider>
        );

        //find the calendar tile and simulate a press
        const calendarTile = getByTestId('calendar-tile'); // Use the testID to find the element

        act(() => {
            fireEvent.press(calendarTile);   //simulate clicking on tile
        });

        //assert that the Calendar page is displayed by checking for a specific content on that page
        const calendarPageTitle = findByText(/Calendar/i);
        expect(calendarPageTitle).toBeTruthy()
    })

    test('Pressing updates tile opens updates widget', async () => {
        const { findByText } = render(
            <Provider store={mockedStore}>
                <Tabs pagesList={pagesList} />
            </Provider>
        );

        //find the updates tile and simulate press 
        const updatesTile = await findByText('Click me to see updates');   //not sure why this needs await while other above doesn't...

        act(() => {
            fireEvent.press(updatesTile)
        });

        //assert that the updates modal is displayed
        const updatesModalTitle = await findByText('Updates:');  //NOTE - text sensitive - if this component changes, this text must change
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