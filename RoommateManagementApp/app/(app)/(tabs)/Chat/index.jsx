import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FlatList, View} from "react-native";
import ChatBubble from "@/PageElements/ChatPage/Components/ChatBubble";
import MessageInput from "@/PageElements/ChatPage/Components/MessageInput";
import {loadMessages, subscribeToMessages, updateChatHistory} from "@/StateManagement/Slices/ChatSlice";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "@/firebase.config";

export default function ChatScreen() {
    const chatHistory = useSelector(state => state.chat.chatHistory);
    const groupID = useSelector(state => state.user.groupID);
    const dispatch = useDispatch();


    useEffect(() => {
        let unsubscribe;

        const setupSubscription = async () => {
            try {
                const chatCollectionRef = collection(db, "groups", groupID, "chats");
                const chatQuery = query(chatCollectionRef, orderBy("timestamp", "asc"));

                // Set up the listener and store the unsubscribe function
                unsubscribe = onSnapshot(chatQuery, (snapshot) => {
                    const messages = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        timestamp: doc.data().timestamp?.toDate().toISOString()
                    }));

                    // Dispatch the messages to Redux
                    dispatch(updateChatHistory(messages));
                });
            } catch (error) {
                console.error("Failed to set up chat subscription:", error);
            }
        };

        setupSubscription();

        // Cleanup subscription on component unmount
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [dispatch, groupID]);

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

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#4B225F', // Equivalent to 'bg-[#4B225F]'
    },
}
