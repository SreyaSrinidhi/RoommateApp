import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import {loadMessages, subscribeToMessages} from "@/StateManagement/Slices/ChatSlice";
import {useDispatch, useSelector} from "react-redux";

export default function ChatScreen() {
    const [message, setMessage] = useState('');
    const groupID =  useSelector(state => state.user.groupID);
    const dispatch = useDispatch();
    const chatHistory = useSelector(state => state.chat.chatHistory);

    useEffect(() => {
        // Load existing messages once
        dispatch(loadMessages(groupID));

        // Set up real-time subscription
        const unsubscribe = dispatch(subscribeToMessages(groupID));

        // Cleanup subscription on component unmount
        return () => {
            if (typeof unsubscribe === "function") unsubscribe();
        };
    }, [groupID, dispatch]);

    const handleSend = () => {
        if (message.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                text: message,
                isSender: true,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessage('');
        }
    };

    return (
        <View style={styles.container} testID='chat-main-page'>
            {/* Chat Messages */}
            <FlatList
                data={chatHistory}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.messageRow, item.isSender && styles.messageRowSender]}>
                        {!item.isSender && (
                            <Image
                                style={styles.avatar}
                                source={{ uri: item.avatar }}
                            />
                        )}
                        <View style={[styles.messageBubble, item.isSender ? styles.senderBubble : styles.receiverBubble]}>
                            <Text style={item.isSender ? styles.senderText : styles.receiverText}>
                                {item.text}
                            </Text>
                            <Text style={[styles.timestamp, item.isSender ? styles.senderTimestamp : styles.receiverTimestamp]}>
                                {item.timestamp}
                            </Text>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.chatContainer}
            />

            {/* Message Input */}
            <View style={styles.inputContainer}>
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
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4B225F', // Equivalent to 'bg-[#4B225F]'
    },
    chatContainer: {
        paddingBottom: 20,
        paddingTop: 40, // Add paddingTop for more space from the top
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 12, // Equivalent to 'mb-3'
    },
    messageRowSender: {
        justifyContent: 'flex-end',
    },
    avatar: {
        width: 40, // Equivalent to 'w-10'
        height: 40, // Equivalent to 'h-10'
        borderRadius: 20, // Equivalent to 'rounded-full'
        marginRight: 8, // Equivalent to 'mr-2'
    },
    messageBubble: {
        maxWidth: '75%', // Equivalent to 'max-w-3/4'
        padding: 12, // Equivalent to 'p-3'
        borderRadius: 8, // Equivalent to 'rounded-lg'
    },
    senderBubble: {
        backgroundColor: '#8CC49F', // Equivalent to 'bg-[#8CC49F]'
    },
    receiverBubble: {
        backgroundColor: '#E5E7EB', // Equivalent to 'bg-gray-200'
    },
    senderText: {
        color: '#FFFFFF', // Equivalent to 'text-white'
    },
    receiverText: {
        color: '#000000', // Equivalent to 'text-black'
    },
    timestamp: {
        fontSize: 10, // Equivalent to 'text-xs'
        marginTop: 4, // Equivalent to 'mt-1'
    },
    senderTimestamp: {
        color: '#D1D5DB', // Equivalent to 'text-gray-200'
    },
    receiverTimestamp: {
        color: '#6B7280', // Equivalent to 'text-gray-500'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16, // Equivalent to 'px-4'
        paddingVertical: 8, // Equivalent to 'py-2'
        backgroundColor: '#8A7191', // Equivalent to 'bg-[#8A7191]'
        marginHorizontal: 16, // Equivalent to 'mx-4'
        marginBottom: 16, // Equivalent to 'mb-4'
        borderRadius: 999, // Equivalent to 'rounded-full'
    },
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
