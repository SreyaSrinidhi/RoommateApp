import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ChatScreen from '../src/Pages/Chat/ChatScreen';

const mockStore = configureStore([]);
const initialState = {
    emergency: {},
    user: { id: '123' },
    calendar: {},
};

const renderWithRedux = (component, { initialState, store = mockStore(initialState) } = {}) => {
    return render(<Provider store={store}>{component}</Provider>);
};

test('renders chat messages correctly', () => {
    const { getByText } = renderWithRedux(<ChatScreen />, { initialState });

    // Verify if the messages are rendered correctly
    expect(getByText("Going well! I’ll take care of it tomorrow 😊")).toBeTruthy();
    expect(getByText("Hey! How’s the cleaning schedule going?")).toBeTruthy();
    expect(getByText("12:47 PM")).toBeTruthy();
    expect(getByText("12:55 PM")).toBeTruthy();
});

test('sends a new message', () => {
    const store = mockStore(initialState);
    const { getByPlaceholderText, getByText } = renderWithRedux(<ChatScreen />, { store });

    // Simulate typing a message
    const messageInput = getByPlaceholderText("Type a message...");
    fireEvent.changeText(messageInput, 'New message');

    // Simulate sending the message
    const sendButton = getByText('Send');
    fireEvent.press(sendButton);

    // Check if the new message appears in the chat history
    expect(getByText('New message')).toBeTruthy();

    // Optional: If you have Redux logic for dispatching actions, test that as well
    const actions = store.getActions();
    expect(actions).toEqual([]); // Adjust this based on your actual Redux setup
});
