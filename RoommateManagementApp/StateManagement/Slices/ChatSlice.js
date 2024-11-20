import uuid from "react-native-uuid";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatHistory: [
        {
            id: '1',
            text: "Going well! I’ll take care of it tomorrow 😊",
            senderId: "1",
            timestamp: "12:47 PM",
            avatar: 'https://i.pinimg.com/564x/9c/ac/dc/9cacdc207e8997bf90a3daf9c8aaca80.jpg',
        },
        {
            id: '2',
            text: "Hey! How’s the cleaning schedule going?",
            senderId: "2",
            timestamp: "12:55 PM",
        },
    ],
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        sendMessage: (state, action) => {
            const { text, senderId } = action.payload; // Fixed destructuring
            if (text.trim()) {
                const newMessage = {
                    id: uuid.v4(), // Generate unique ID for the message
                    text,
                    senderId,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                state.chatHistory.push(newMessage); // Add new message to chat history
            }
        },
    },
});

export const { sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
