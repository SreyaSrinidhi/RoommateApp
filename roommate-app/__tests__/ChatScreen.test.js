import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Text, TextInput, Button } from 'react-native';
import ChatScreen from '../src/Pages/Chat/ChatScreen';
import { ChatProvider, ChatContext } from '../src/Pages/Chat/Context';

const mockStore = configureStore([]);
const initialState = {
    emergency: {},
    user: { id: '123' },
    calendar: {},
};

const renderWithRedux = (component, { initialState, store = mockStore(initialState) } = {}) => {
    return render(<Provider store={store}>{component}</Provider>);
};

test('renders chat messages correctly', async () => {
    const { getByText } = renderWithRedux(<ChatScreen />, { initialState });

    // Verify if the messages are rendered correctly
    expect(getByText("Going well! I’ll take care of it tomorrow 😊")).toBeTruthy();
    expect(getByText("Hey! How’s the cleaning schedule going?")).toBeTruthy();
    expect(getByText("12:47 PM")).toBeTruthy();
    expect(getByText("12:55 PM")).toBeTruthy();
});

test('sends a new message', async () => {
    const store = mockStore(initialState);
    const { getByPlaceholderText, getByText, findByText } = renderWithRedux(<ChatScreen />, { store });

    // Simulate typing a message
    const messageInput = getByPlaceholderText("Type a message...");
    fireEvent.changeText(messageInput, 'New message');

    // Simulate sending the message
    const sendButton = getByText('Send');
    fireEvent.press(sendButton);

    // Check if the new message appears in the chat history
    const newMessage = await findByText('New message');
    expect(newMessage).toBeTruthy();

    // Optional: If you have Redux logic for dispatching actions, test that as well
    const actions = store.getActions();
    expect(actions).toEqual([]); // Adjust this based on your actual Redux setup
});

// New Test Cases for ChatContext
const renderWithChatProvider = (ui) => {
    return render(<ChatProvider>{ui}</ChatProvider>);
};

describe('ChatContext Tests', () => {
    test('initializes with default chat history', () => {
        const { getByText } = renderWithChatProvider(
            <ChatContext.Consumer>
                {({ chatHistory }) => (
                    <>
                        {chatHistory.map((msg, index) => (
                            <React.Fragment key={index}>
                                <Text>{msg.text}</Text>
                                <Text>{msg.timestamp}</Text>
                            </React.Fragment>
                        ))}
                    </>
                )}
            </ChatContext.Consumer>
        );

        // Verify that default messages are rendered
        expect(getByText("Going well! I’ll take care of it tomorrow 😊")).toBeTruthy();
        expect(getByText("12:47 PM")).toBeTruthy();
        expect(getByText("Hey! How’s the cleaning schedule going?")).toBeTruthy();
        expect(getByText("12:55 PM")).toBeTruthy();
    });

    test('sends a new message', () => {
        const { getByText, rerender } = renderWithChatProvider(
            <ChatContext.Consumer>
                {({ chatHistory, sendMessage }) => (
                    <>
                        <Text testID="message-count">{chatHistory.length}</Text>
                        <Button title="Send Message" onPress={() => sendMessage("New test message")} />
                    </>
                )}
            </ChatContext.Consumer>
        );

        // Check initial chat message count
        const initialMessageCount = getByText("2");
        expect(initialMessageCount).toBeTruthy();

        // Send a new message
        fireEvent.press(getByText("Send Message"));

        // Re-render to reflect context updates
        rerender(
            <ChatProvider>
                <ChatContext.Consumer>
                    {({ chatHistory }) => (
                        <>
                            <Text testID="message-count">{chatHistory.length}</Text>
                            {chatHistory.map((msg, index) => (
                                <Text key={index}>{msg.text}</Text>
                            ))}
                        </>
                    )}
                </ChatContext.Consumer>
            </ChatProvider>
        );

        // Verify the new message was added
        expect(getByText("3")).toBeTruthy();
        expect(getByText("New test message")).toBeTruthy();
    });

    test('clears the input message after sending', () => {
        const { getByPlaceholderText, getByText, rerender } = renderWithChatProvider(
            <ChatContext.Consumer>
                {({ message, setMessage, sendMessage }) => (
                    <>
                        <TextInput
                            placeholder="Type a message..."
                            value={message}
                            onChangeText={setMessage}
                        />
                        <Button title="Send" onPress={() => sendMessage(message)} />
                    </>
                )}
            </ChatContext.Consumer>
        );

        const input = getByPlaceholderText("Type a message...");

        // Simulate typing a message
        fireEvent.changeText(input, "Message to clear");
        expect(input.props.value).toBe("Message to clear");

        // Send the message
        fireEvent.press(getByText("Send"));

        // Re-render to reflect context updates
        rerender(
            <ChatProvider>
                <ChatContext.Consumer>
                    {({ message }) => (
                        <TextInput
                            placeholder="Type a message..."
                            value={message}
                        />
                    )}
                </ChatContext.Consumer>
            </ChatProvider>
        );

        // Verify the input message is cleared
        expect(input.props.value).toBe("");
    });
});
