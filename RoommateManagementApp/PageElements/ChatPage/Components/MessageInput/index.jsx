import React, { useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "@/StateManagement/Slices/ChatSlice";


const MessageInput = () => {
    const [message, setMessage] = useState('');
    const userID = useSelector(state => state.user.id);
    const dispatch  = useDispatch();

    const handleSend = () => {
        if (message) {
            dispatch(sendMessage({text: message, senderId: userID}));
            setMessage("");
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
