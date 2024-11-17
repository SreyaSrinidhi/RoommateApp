import React from 'react';
import { Text, Alert } from 'react-native';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import LoginPage from '../src/Pages/LoginPage';
import HomePage from '../src/Pages/HomePage'
import { Provider } from 'react-redux';
import { store } from '../src/StateManagement/store'
import { NavigationContainer } from '@react-navigation/native';
import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';  //needed to mock redux store
import Tabs from '../src/Components/Tabs';
import { initialState, rootReducer } from '../src/StateManagement/store'; // Import your initial state and rootReducer


//A file for testing the functionality of the login page

describe('LS-1: Attempt login with incorrect input type', () => {  //incorrect type will be empty username for now

    //mock the Alert.alert function for checking login fail alerts
    jest.spyOn(Alert, 'alert')

    test('Rejects login request if incorrect type for username', async () => {
        //render the login page
        const { getByPlaceholderText, getByText, queryByText } = render(
            <Provider store={store}>
                <Tabs pagesList={[{ name: "Login", component: LoginPage }, { name: "Home", component: HomePage }]} />
            </Provider>
        );

        //get the necessary inputs and login button
        const usernameInput = screen.getByPlaceholderText("Enter your username");
        const passwordInput = screen.getByPlaceholderText("Enter your password");
        const loginButton = screen.getByText("Login");

        //simulate entering empty username and password
        fireEvent.changeText(usernameInput, '');
        fireEvent.changeText(passwordInput, 'password123');

        //simulate pressing the login button
        fireEvent.press(loginButton);


        // Check that Alert.alert was called with the expected message
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please enter both username and password.');
        })
    })
})

describe('LS-2: Attempt login with incorrect username or password', () => {  //will be empty password for now
    //mock the Alert.alert function for checking login fail alerts
    jest.spyOn(Alert, 'alert')

    test('Rejects login request if incorrect username and password combo', async () => {
        //render the login page
        const { getByPlaceholderText, getByText, queryByText } = render(
            <Provider store={store}>
                <Tabs pagesList={[{ name: "Login", component: LoginPage }, { name: "Home", component: HomePage }]} />
            </Provider>
        );

        //get the necessary inputs and login button
        const usernameInput = screen.getByPlaceholderText("Enter your username");
        const passwordInput = screen.getByPlaceholderText("Enter your password");
        const loginButton = screen.getByText("Login");


        //simulate entering empty username and password
        fireEvent.changeText(usernameInput, 'userName');
        fireEvent.changeText(passwordInput, '');

        //simulate pressing the login button
        fireEvent.press(loginButton);


        // Check that Alert.alert was called with the expected message
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please enter both username and password.');
        })
    })
})

describe('LS-3: Login with Correct Username and Password', () => {
    test('Navigates to HomePage when login pressed if inputs filled correctly', async () => {
        const { getByPlaceholderText, getByText, queryByText } = render(
            <Provider store={store}>
                <Tabs pagesList={[{ name: "Login", component: LoginPage }, { name: "Home", component: HomePage }]} />
            </Provider>
        );

        const usernameInput = screen.getByPlaceholderText("Enter your username");
        const passwordInput = screen.getByPlaceholderText("Enter your password");
        const loginButton = screen.getByText("Login"); // Use getByText to find the button

        //simulate entering username and password
        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, 'password123');

        //simulate pressing the login button
        fireEvent.press(loginButton);

        //Assert that LoginPage is no longer rendered
        await waitFor(() => {
            expect(screen.queryByText('Login')).toBeNull(); // Ensure Login button is gone
            expect(screen.queryByPlaceholderText('Enter your username')).toBeNull(); // Ensure username input is gone
            expect(screen.queryByPlaceholderText('Enter your password')).toBeNull(); // Ensure password input is gone
        })


        // Check that Home Page is now rendered
        // Check that the text "Home" is present, and there are the correct number of instances
        const homeElements = screen.getAllByText('Home');
        expect(homeElements).toHaveLength(2); // Ensure there's exactly one
    })
})

// Define a mock reducer for mocking store - needed  for future tests now that login has occurred above in real store
const mockReducer = {
    user: (state = { id: null }, action) => state, // simple reducer for 'user'
    calendar: (state = {}, action) => state, // simple reducer for 'calendar'
    emergency: (state = {}, action) => state, // simple reducer for 'emergency'
};

describe('LS-4: Sign Up Page Opens From Its Button', () => {
    let mockedStore;  //define a store for our mock

    //initialize mocked store with logged in
    mockedStore = configureStore({
        reducer: mockReducer,  //pass the mock reducer
    });

    test('Opens Sign Up modal when Signup button pressed', async () => {
        const { getByText, findByText } = render(
            <Provider store={mockedStore}>
                <Tabs pagesList={[{ name: "Login", component: LoginPage }, { name: "Home", component: HomePage }]} />
            </Provider>
        );

        const signupButton = screen.getByText('Click here to Sign Up'); // Use the testID to find the element

        //simulate pressing the signup button
        fireEvent.press(signupButton);

        const signupModalTitle = await findByText('Create an Account');  //NOTE - text sensitive - if this component changes, this text must change

        //Assert that LoginPage is no longer rendered
        expect(signupModalTitle).toBeTruthy();
    })
});

describe('LS-5: Fill in Invalid Input Data', () => {
    jest.spyOn(Alert, 'alert')   //mock Alerts
    let mockedStore;  //define a store for our mock

    //initialize mocked store with logged in
    mockedStore = configureStore({
        reducer: mockReducer,  //pass the mock reducer
    });

    test('Fail to submit new user when input data invalid', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={mockedStore}>
                <Tabs pagesList={[{ name: "Login", component: LoginPage }, { name: "Home", component: HomePage }]} />
            </Provider>
        );

        //open the sign up modal (same code as in LS-4)
        const signupButton = screen.getByText('Click here to Sign Up'); // Use the testID to find the element
        fireEvent.press(signupButton); //simulate pressing the signup button

        const usernameInput = screen.getByPlaceholderText("Enter your username");
        const emailInput = screen.getByPlaceholderText("Enter your email");
        const passwordInput = screen.getByPlaceholderText("Enter your password");
        const confirmPassowrdInput = screen.getByPlaceholderText("Confirm your password");
        const signupConfirmButton = screen.getByText('Sign Up'); // Use the testID to find the element

        //simulate entering empty username, filled password
        fireEvent.changeText(usernameInput, '');
        fireEvent.changeText(emailInput, 'email@mail.com');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.changeText(confirmPassowrdInput, 'password');

        fireEvent.press(signupConfirmButton);  //press the sign up button on modal

        // Check that Alert.alert was called with the expected message
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please fill all fields.');
        })

        //simulate entering empty email, filled other
        fireEvent.changeText(usernameInput, 'userName');
        fireEvent.changeText(emailInput, '');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.changeText(confirmPassowrdInput, 'password');

        fireEvent.press(signupConfirmButton);  //press the sign up button on modal

        // Check that Alert.alert was called with the expected message
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please fill all fields.');
        })

        //simulate entering empty password, filled other
        fireEvent.changeText(usernameInput, 'userName');
        fireEvent.changeText(emailInput, 'email@mail.com');
        fireEvent.changeText(passwordInput, '');
        fireEvent.changeText(confirmPassowrdInput, '');

        fireEvent.press(signupConfirmButton);  //press the sign up button on modal

        // Check that Alert.alert was called with the expected message
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please fill all fields.');
        })
    })
});

describe('LS-6: Fill in Non-Matching Passwords', () => {
    jest.spyOn(Alert, 'alert')   //mock Alerts
    let mockedStore;  //define a store for our mock

    //initialize mocked store with logged in
    mockedStore = configureStore({
        reducer: mockReducer,  //pass the mock reducer
    });

    test('Fail to submit new user when passwords do not match', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={mockedStore}>
                <Tabs pagesList={[{ name: "Login", component: LoginPage }, { name: "Home", component: HomePage }]} />
            </Provider>
        );

        //open the sign up modal (same code as in LS-4)
        const signupButton = screen.getByText('Click here to Sign Up'); // Use the testID to find the element
        fireEvent.press(signupButton); //simulate pressing the signup button

        const usernameInput = screen.getByPlaceholderText("Enter your username");
        const emailInput = screen.getByPlaceholderText("Enter your email");
        const passwordInput = screen.getByPlaceholderText("Enter your password");
        const confirmPassowrdInput = screen.getByPlaceholderText("Confirm your password");
        const signupConfirmButton = screen.getByText('Sign Up'); // Use the testID to find the element

        //simulate entering empty username, filled password
        fireEvent.changeText(usernameInput, 'userName');
        fireEvent.changeText(emailInput, 'email@mail.com');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.changeText(confirmPassowrdInput, 'notPassword');

        fireEvent.press(signupConfirmButton);  //press the sign up button on modal

        // Check that Alert.alert was called with the expected message
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith('Error', 'Passwords do not match.');
        })
    })
});

describe('LS-7: Fill in Valid Information', () => {
    jest.spyOn(Alert, 'alert')   //mock Alerts
    let mockedStore;  //define a store for our mock

    //initialize mocked store with logged in
    mockedStore = configureStore({
        reducer: mockReducer,  //pass the mock reducer
    });

    test('Accept sign up request when all inputs valid', async () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={mockedStore}>
                <Tabs pagesList={[{ name: "Login", component: LoginPage }, { name: "Home", component: HomePage }]} />
            </Provider>
        );

        //open the sign up page (same code as in LS-4)
        const signupButton = screen.getByText('Click here to Sign Up'); // Use the testID to find the element
        fireEvent.press(signupButton); //simulate pressing the signup button

        const usernameInput = screen.getByPlaceholderText("Enter your username");
        const emailInput = screen.getByPlaceholderText("Enter your email");
        const passwordInput = screen.getByPlaceholderText("Enter your password");
        const confirmPassowrdInput = screen.getByPlaceholderText("Confirm your password");
        const signupConfirmButton = screen.getByText('Sign Up'); // Use the testID to find the element

        //simulate entering empty username, filled password
        fireEvent.changeText(usernameInput, 'userName');
        fireEvent.changeText(emailInput, 'email@mail.com');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.changeText(confirmPassowrdInput, 'password');

        fireEvent.press(signupConfirmButton);  //press the sign up button on modal

        //check that login action was performed and routed to home page
        //Assert that LoginPage is no longer rendere

        // Check that Alert.alert was called with the expected message
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith('Success', 'You have signed up successfully!');
        })

        //bug notice - In tests, sign up navigates back to Login page, but when used manually, routes to Home..?
    })
});



//Non-Functiona Render Tests

//describe is used to create a block of tests for organization purposes - can describe multiple things in one file
describe('LoginPage Render Tests', () => {
    //Rendering Tests - test renders correctly with username and password input fields, login button
    test('renders LoginPage with input fields and login button', () => {
        render(
            //make sure to provide the store context to the page when rendering
            <Provider store={store}>
                <LoginPage />
            </Provider>
        );
        expect(screen.getByPlaceholderText("Enter your username")).toBeTruthy();    //NOTE - finding element based on its EXACT placeholder text
        expect(screen.getByPlaceholderText("Enter your password")).toBeTruthy();
        expect(screen.getByText("Login")).toBeTruthy();
    })
})