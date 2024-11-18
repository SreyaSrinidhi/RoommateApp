import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';

export default function ChatScreen() {
    const [message, setMessage] = useState('');
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

    const handleSend = () => {
        if (message.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                text: message,
                isSender: true,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setChatHistory([...chatHistory, newMessage]);  // Adds message to the end of the array
            setMessage('');
        }
    };

    return (
        <View className="flex-1 bg-[#4B225F]" testID='chat-main-page'>
            {/* Chat Messages */}
            <FlatList
                data={chatHistory}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className={`flex-row items-end mb-3 ${item.isSender ? 'justify-end' : ''}`}>
                        {!item.isSender && (
                            <Image
                                className="w-10 h-10 rounded-full mr-2"
                                source={{ uri: item.avatar }}
                            />
                        )}
                        <View className={`max-w-3/4 p-3 rounded-lg ${item.isSender ? 'bg-[#8CC49F]' : 'bg-gray-200'}`}>
                            <Text className={`${item.isSender ? 'text-white' : 'text-black'}`}>{item.text}</Text>
                            <Text className={`text-xs mt-1 ${item.isSender ? 'text-gray-200' : 'text-gray-500'}`}>
                                {item.timestamp}
                            </Text>
                        </View>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 40 }} // Add paddingTop for more space from the top
            />


            {/* Message Input */}
            <View className="flex-row items-center px-4 py-2 bg-[#8A7191] mx-4 mb-4 rounded-full">
                <TextInput
                    className="flex-1 h-10 px-4 text-white bg-transparent rounded-full"
                    placeholder="Type a message..."
                    placeholderTextColor="#FFFFFF"
                    value={message}
                    onChangeText={setMessage}
                    style={{ color: 'white' }}
                />
                <TouchableOpacity className="ml-2 px-4 py-2 bg-[#4B225F] rounded-full" onPress={handleSend}>
                    <Text className="text-white font-bold">Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
