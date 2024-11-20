import React, { useState } from 'react';
import {View, TextInput, Button, StyleSheet, TouchableOpacity, Text} from 'react-native';

const MessageInput = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <>
            <TextInput
                style={styles.textInput}
                placeholder="Type a message..."
                placeholderTextColor="#FFFFFF"
                value={message}
                onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    textInput: {
    flex: 1,
        height: 40, // Equivalent to 'h-10'
        paddingHorizontal: 16, // Equivalent to 'px-4'
        color: '#FFFFFF', // White text color
        backgroundColor: 'transparent',
        borderRadius: 999, // Rounded input field
},
sendButton: {
    marginLeft: 8, // Equivalent to 'ml-2'
        paddingHorizontal: 16, // Equivalent to 'px-4'
        paddingVertical: 8, // Equivalent to 'py-2'
        backgroundColor: '#4B225F', // Equivalent to 'bg-[#4B225F]'
        borderRadius: 999, // Equivalent to 'rounded-full'
},
sendButtonText: {
    color: '#FFFFFF', // Equivalent to 'text-white'
        fontWeight: 'bold', // Equivalent to 'font-bold'
},
});

export default MessageInput;
