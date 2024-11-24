import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "@/StateManagement/Slices/ChatSlice";

const MessageInput = () => {
    const [message, setMessage] = useState('');
    const userID = useSelector((state) => state.user.id);
    const dispatch = useDispatch();

    const handleSend = () => {
        if (message.trim()) { // Prevent sending empty or whitespace-only messages
            dispatch(sendMessage({ text: message.trim(), senderId: userID }));
            setMessage(""); // Clear input after sending
        } else {
            console.log("Cannot send an empty message");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TextInput
                style={styles.textInput}
                placeholder="Type a message..."
                placeholderTextColor="#BBBBBB"
                value={message}
                onChangeText={setMessage}
                onSubmitEditing={handleSend} // Send message on "Enter" key press
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Layout text input and button horizontally
        alignItems: 'center', // Center items vertically
        padding: 8, // Padding around the container
        backgroundColor: '#EDEFF7', // Dark background for input area
        borderTopWidth: 1, // Add a border on top
        borderTopColor: '#333333', // Border color
    },
    textInput: {
        flex: 1, // Input takes up remaining space
        height: 40, // Equivalent to 'h-10'
        paddingHorizontal: 16, // Padding inside the input
        color: '#FFFFFF', // White text color
        backgroundColor: '#222222', // Slightly lighter background for contrast
        borderRadius: 20, // Rounded input field
    },
    sendButton: {
        marginLeft: 8, // Space between input and button
        paddingHorizontal: 16, // Button padding
        paddingVertical: 8, // Vertical padding
        backgroundColor: '#4B225F', // Purple background
        borderRadius: 20, // Fully rounded button
    },
    sendButtonText: {
        color: '#FFFFFF', // White text color
        fontWeight: 'bold', // Bold font
    },
});

export default MessageInput;
