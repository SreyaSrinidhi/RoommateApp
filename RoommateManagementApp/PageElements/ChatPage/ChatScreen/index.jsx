import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ChatBubble from "@/PageElements/ChatPage/Components/ChatBubble";
import MessageInput from "@/PageElements/ChatPage/Components/MessageInput";

export default function ChatScreen() {
    const [chatHistory, setChatHistory] = useState([
        {
            id: '1',
            text: "Going well! I’ll take care of it tomorrow 😊",
            isSender: false,
            timestamp: "12:47 PM",
            avatar: 'https://i.pinimg.com/564x/9c/ac/dc/9cacdc207e8997bf90a3daf9c8aaca80.jpg',
        },
        {
            id: '2',
            text: "Hey! How’s the cleaning schedule going?",
            isSender: true,
            timestamp: "12:55 PM",
        },
    ]);

    const handleSend = (message) => {
        if (message.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                text: message,
                isSender: true,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setChatHistory([...chatHistory, newMessage]); // Adds message to the end of the array
        }
    };

    return (
        <View style={styles.container} testID='chat-main-page'>
            {/* Chat Messages */}
            <FlatList
                data={chatHistory}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.chatContainer}
                renderItem={({item}) => <ChatBubble item={item} />}
            />

            {/* Message Input */}
            <View style={styles.inputContainer}>
                <MessageInput onSend={handleSend} />
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16, // Equivalent to 'px-4'
        paddingVertical: 8, // Equivalent to 'py-2'
        backgroundColor: '#8A7191', // Equivalent to 'bg-[#8A7191]'
        marginHorizontal: 16, // Equivalent to 'mx-4'
        marginBottom: 16, // Equivalent to 'mb-4'
        borderRadius: 999, // Equivalent to 'rounded-full'
    }
});
