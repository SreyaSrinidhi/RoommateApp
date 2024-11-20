import React from 'react';
import {useSelector} from "react-redux";
import {FlatList, View} from "react-native";
import ChatBubble from "@/PageElements/ChatPage/Components/ChatBubble";
import MessageInput from "@/PageElements/ChatPage/Components/MessageInput";

export default function ChatScreen() {
    const chatHistory = useSelector(state => state.chat.chatHistory);

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
                <MessageInput  />
            </View>
        </View>
    );
}
