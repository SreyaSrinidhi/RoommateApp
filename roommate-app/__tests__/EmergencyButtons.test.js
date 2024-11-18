import React from 'react';
import { Alert } from 'react-native'
import { screen, render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EmergencyNotifications from '../src/Pages/EmergencyNotifications';
import Tabs from '../src/Components/Tabs';

const mockStore = configureStore([]);
const initialState = {
    emergency: {
        buttons: {
            1 : {id: 1, title : 'Predefined Emergency', message: 'Predefined Emergency Message', bgColor: 'bg-red-500', isPermanent: true},
            2 : {id: 2, title: 'Test Emergency', message: 'Test emergency message', bgColor: 'bg-green-500', isPermanent: false},
        }
    },
    user: { id: '123' },
    calendar: {},
    
};
const store = mockStore(initialState);

// Mocking navigation for testing
const mockNavigation = {
    setOptions: jest.fn(),
};

// Mock dispatch to track if it's called
const mockDispatch = jest.fn();

//mock the Alert.alert function for checking login fail alerts
jest.spyOn(Alert, 'alert')

const renderWithRedux = (component, { initialState, store = mockStore(initialState) } = {}) => {
    store.dispatch = mockDispatch;  //pass in mocked dispatch

    return render(
    <Provider store={store}>
        {React.cloneElement(component, { navigation: mockNavigation })}
    </Provider>
    );
};

describe('LM-1: Attempt to delete a permanent emergency button', () => {
    test('Does not render to delete permanent emergency buttons', async () => {
        renderWithRedux(<Tabs pagesList={[{ name: "Emergency Notifications", component: EmergencyNotifications }]} />,
             { initialState });
    
        // get pre-rendered permanent button
        const predefinedEmergency = screen.getByText("Predefined Emergency")
        expect(predefinedEmergency).toBeTruthy();  //check that the button exists

        //simulate pressing the login button
        fireEvent.press(predefinedEmergency);

        //check that the button modal renders without delete button
        await waitFor(() => {
            expect(screen.queryByText(/Notification Message:/)).toBeTruthy(); // Ensure description heading displayed
            expect(screen.queryByText(/Predefined Emergency Message/)).toBeTruthy(); // Ensure description  displayed
            expect(screen.queryByText('Send Emergency Notification')).toBeTruthy(); // Ensure send emergency button displayed
            expect(screen.queryByText('Edit')).toBeNull();  //no edit button should be rendered
            expect(screen.queryByText('Delete')).toBeNull(); //no delete button should be rendered
        })     
    });
})

describe('LM-2: Attempt to delete a user-added emergency button', () => {
    test('Allows for deletion of non-permanent emergency button', async () => {
        renderWithRedux(<Tabs pagesList={[{ name: "Emergency Notifications", component: EmergencyNotifications }]} />,
             { initialState });

        // get non-permanent button
        const testEmergencyButton = screen.getByText("Test Emergency");
        expect(testEmergencyButton).toBeTruthy();  // check that the button exists

        // simulate pressing the emergency button
        fireEvent.press(testEmergencyButton);

        // check modal renders with delete button
        await waitFor(() => {
            expect(screen.queryByText(/Notification Message:/)).toBeTruthy();  // Ensure description heading is displayed
            expect(screen.queryByText(/Test emergency message/)).toBeTruthy();  // Ensure description is displayed
            expect(screen.queryByText('Send Emergency Notification')).toBeTruthy();  // Ensure send emergency button is displayed
            expect(screen.queryByText('Delete')).toBeTruthy();  // Ensure delete button is visible for non-permanent buttons
        });

        // simulate pressing delete button
        const deleteButton = screen.getByText('Delete');
        fireEvent.press(deleteButton);

        // assert the button is deleted (or removed from the state)
        await waitFor(() => {
            //check that the dispatch was called for deletion
            expect(mockDispatch).toHaveBeenCalledTimes(1);

            //expect dispatch to have been called with correct action
            expect(mockDispatch).toHaveBeenCalledWith({
                type: 'emergency/deleteEmergencyButton',
                payload: {
                    buttonId: 2 
                }
            })
        });
    });
})

describe('LM-3: Attempt creating a new emergency button with no inputs', () => {
    test('Prevents creation of emergency button with no inputs', async () => {
        renderWithRedux(
            <Tabs pagesList={[{ name: "Emergency Notifications", component: EmergencyNotifications }]} />, 
            { initialState });

        // get non-permanent button
        const openModalButton = screen.getByTestId("add-emergency-modal-button");
        expect(openModalButton).toBeTruthy();  // check that the button exists

        // simulate pressing the emergency button
        fireEvent.press(openModalButton);

        // check modal renders with delete button
        await waitFor(() => {
             expect(screen.queryByText("Add Emergency Button")).toBeTruthy();  
        });

        //get necessary inputs
        const titleInput = screen.getByPlaceholderText("Enter title here");
        const descriptionInput = screen.getByPlaceholderText("Enter description here");
        const addButton = screen.getByText("Add");

        //simulate entering title and description - both empty
        fireEvent.changeText(titleInput, '');
        fireEvent.changeText(descriptionInput, '');
        fireEvent.press(addButton); //press the add button

        // Check that Alert.alert was called with the expected message
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please enter a title and description.');
        })
        
    });
})

describe('LM-4: Attempt creating a new emergency button with inputs filled', () => {
    test('Creates mew emergency button when inputs are filled', async () => {
        renderWithRedux(
            <Tabs pagesList={[{ name: "Emergency Notifications", component: EmergencyNotifications }]} />, 
            { initialState });

        // get non-permanent button
        const openModalButton = screen.getByTestId("add-emergency-modal-button");
        expect(openModalButton).toBeTruthy();  // check that the button exists

        // simulate pressing the emergency button
        fireEvent.press(openModalButton);

        // check modal renders with delete button
        await waitFor(() => {
             expect(screen.queryByText("Add Emergency Button")).toBeTruthy();  
        });

        //get necessary inputs
        const titleInput = screen.getByPlaceholderText("Enter title here");
        const descriptionInput = screen.getByPlaceholderText("Enter description here");
        const colorInput = screen.getByPlaceholderText("Enter color here");
        const addButton = screen.getByText("Add");

        //simulate entering title and description - both empty
        fireEvent.changeText(titleInput, 'New Button');
        fireEvent.changeText(descriptionInput, 'New Button Description');
        fireEvent.changeText(colorInput, 'bg-blue-500');
        fireEvent.press(addButton); //press the add button

        // assert the button is added by dispatch
        await waitFor(() => {
            //expect dispatch to have been called with correct action
            expect(mockDispatch).toHaveBeenCalledWith({
                type: 'emergency/addEmergencyButton',
                payload: {
                    title: 'New Button', 
                    message: 'New Button Description', 
                    bgColor: 'bg-blue-500'
                }
            })
        });
        
    });
})

describe('LM-5: Attempt invalid edit on emergency', () => {
    test('Reject the edit submission and notify the user', async () => {
        renderWithRedux(<Tabs pagesList={[{ name: "Emergency Notifications", component: EmergencyNotifications }]} />,
             { initialState });

        // get non-permanent button
        const testEmergencyButton = screen.getByText("Test Emergency");
        expect(testEmergencyButton).toBeTruthy();  // check that the button exists

        // simulate pressing the emergency button
        fireEvent.press(testEmergencyButton);

        // check modal renders with delete button
        await waitFor(() => {
            expect(screen.queryByText(/Notification Message:/)).toBeTruthy();  // Ensure description heading is displayed
            expect(screen.queryByText(/Test emergency message/)).toBeTruthy();  // Ensure description is displayed
            expect(screen.queryByText('Send Emergency Notification')).toBeTruthy();  // Ensure send emergency button is displayed
            expect(screen.queryByText('Edit')).toBeTruthy();  // Ensure delete button is visible for non-permanent buttons
        });

        // simulate pressing delete button
        const editButton = screen.getByText('Edit');
        fireEvent.press(editButton);

        // check that edit menu is rendered
        await waitFor(() => {
            expect(screen.queryByText("Edit Emergency Button")).toBeTruthy();  //ensure that the modal title is displayed
        });

        //gather the necessary inputs 
        const titleInput = screen.getByPlaceholderText("Enter title here");
        const messageInput = screen.getByPlaceholderText("Enter message here");
        const saveButton = screen.getByText("Save");

        //simulate entering title and message - both empty
        fireEvent.changeText(titleInput, '');
        fireEvent.changeText(messageInput, '');
        fireEvent.press(saveButton); //press the save button

        // Check that Alert.alert was called with the expected message
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith('Error', 'Title and description must not be empty.');
        })
    });
})

describe('LM-6: Attempt valid edit on emergency button', () => {
    test('Accept the edit submission and dispatch edit to button', async () => {
        renderWithRedux(<Tabs pagesList={[{ name: "Emergency Notifications", component: EmergencyNotifications }]} />,
             { initialState });

        // get non-permanent button
        const testEmergencyButton = screen.getByText("Test Emergency");
        expect(testEmergencyButton).toBeTruthy();  // check that the button exists

        // simulate pressing the emergency button
        fireEvent.press(testEmergencyButton);

        // check modal renders with delete button
        await waitFor(() => {
            expect(screen.queryByText(/Notification Message:/)).toBeTruthy();  // Ensure description heading is displayed
            expect(screen.queryByText(/Test emergency message/)).toBeTruthy();  // Ensure description is displayed
            expect(screen.queryByText('Send Emergency Notification')).toBeTruthy();  // Ensure send emergency button is displayed
            expect(screen.queryByText('Edit')).toBeTruthy();  // Ensure delete button is visible for non-permanent buttons
        });

        // simulate pressing delete button
        const editButton = screen.getByText('Edit');
        fireEvent.press(editButton);

        // check that edit menu is rendered
        await waitFor(() => {
            expect(screen.queryByText("Edit Emergency Button")).toBeTruthy();  //ensure that the modal title is displayed
        });

        //gather the necessary inputs 
        const titleInput = screen.getByPlaceholderText("Enter title here");
        const messageInput = screen.getByPlaceholderText("Enter message here");
        const colorInput = screen.getByPlaceholderText("Enter color here");
        const saveButton = screen.getByText("Save");

        //simulate entering title and message - both empty
        fireEvent.changeText(titleInput, 'New Title');
        fireEvent.changeText(messageInput, 'New Message');
        fireEvent.changeText(colorInput, 'bg-black-500');
        fireEvent.press(saveButton); //press the save button

        // assert the button is edited by dispatch
        await waitFor(() => {
            //expect dispatch to have been called with correct action
            expect(mockDispatch).toHaveBeenCalledWith({
                type: 'emergency/editEmergencyButton',
                payload: {
                    buttonId: 2,
                    title: 'New Title', 
                    message: 'New Message', 
                    bgColor: 'bg-black-500'
                }
            })
        });
    });
})

describe('LM-7: Trigger emergency notification', () => {
    test('Send emergency notification', async () => {
        renderWithRedux(<Tabs pagesList={[{ name: "Emergency Notifications", component: EmergencyNotifications }]} />,
             { initialState });

        // get non-permanent button
        const predefinedEmergency = screen.getByText("Predefined Emergency")
        expect(predefinedEmergency).toBeTruthy();  //check that the button exists

        //simulate pressing the login button
        fireEvent.press(predefinedEmergency);

        //check that the button modal renders without delete button
        await waitFor(() => {
            expect(screen.queryByText(/Notification Message:/)).toBeTruthy(); // Ensure description heading displayed
            expect(screen.queryByText(/Predefined Emergency Message/)).toBeTruthy(); // Ensure description  displayed
            expect(screen.queryByText('Send Emergency Notification')).toBeTruthy(); // Ensure send emergency button displayed
            expect(screen.queryByText('Edit')).toBeNull();  //no edit button should be rendered
            expect(screen.queryByText('Delete')).toBeNull(); //no delete button should be rendered
        })     

        // simulate pressing delete button
        const sendNotifButton = screen.getByText('Send Emergency Notification');
        fireEvent.press(sendNotifButton);

        // Check that Alert.alert was called with the expected message
        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith("Emergency button Predefined Emergency pressed with message: Predefined Emergency Message");
        })
    });
})