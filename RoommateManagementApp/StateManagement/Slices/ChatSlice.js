import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, query, getDocs, orderBy,onSnapshot } from "firebase/firestore";
import { db } from "@/firebase.config"; // Replace with your Firebase config path

export const subscribeToMessages = createAsyncThunk(
    "chat/subscribeToMessages",
    async (groupID, { dispatch, rejectWithValue }) => {
        try {
            const chatCollectionRef = collection(db, "groups", groupID, "chats");
            const chatQuery = query(chatCollectionRef, orderBy("timestamp", "asc"));

            // Set up the real-time listener
            const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
                const messages = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        timestamp: data.timestamp?.toDate().toISOString(), // Convert to ISO string
                    };
                });

                // Dispatch an action to update chat history
                dispatch(chatSlice.actions.updateChatHistory(messages));
            });

            return { success: true }; // Return serializable data
        } catch (error) {
            console.error("Failed to subscribe to messages:", error);
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to send a chat message
export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async ({ groupID, senderID, text }, { rejectWithValue }) => {
        try {
            const chatCollectionRef = collection(db, "groups", groupID, "chats");

            // Create the message document
            const message = {
                id: `${Date.now()}-${senderID}`,
                senderID,
                text,
                timestamp: new Date(), // Save as a Date object
            };

            // Add the message to Firestore
            await addDoc(chatCollectionRef, message);

            console.log("Message sent:", message);

            // Convert timestamp to ISO string for Redux state
            return { ...message, timestamp: message.timestamp.toISOString() };
        } catch (error) {
            console.error("Failed to send message:", error);
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to load chat messages
export const loadMessages = createAsyncThunk(
    "chat/loadMessages",
    async (groupID, { rejectWithValue }) => {
        try {
            const chatCollectionRef = collection(db, "groups", groupID, "chats");

            const chatQuery = query(chatCollectionRef, orderBy("timestamp", "asc"));
            const snapshot = await getDocs(chatQuery);

            const messages = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    timestamp: data.timestamp?.toDate().toISOString(), // Convert to ISO string
                };
            });

            console.log("Messages loaded:", messages);
            return messages; // Return messages to update the state
        } catch (error) {
            console.error("Failed to load messages:", error);
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    chatHistory: [], // Initialize as an empty array for chats loaded from Firestore
    isLoading: false,
    error: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        updateChatHistory: (state, action) => {
            state.chatHistory = action.payload;// Replace the chat history with the latest messages
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle sendMessage
            .addCase(sendMessage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Handle loadMessages
            .addCase(loadMessages.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chatHistory = action.payload; // Replace the chat history with loaded messages
            })
            .addCase(loadMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { updateChatHistory } = chatSlice.actions;

export default chatSlice.reducer;
