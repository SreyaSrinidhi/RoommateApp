// src/Pages/FriendsScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const friendsData = [
    {
        id: '1',
        name: 'Earl E. Phant',
        balance: 'owes you $99.88',
        transactions: [
            'Earl E. owes you $67.70 for "Elle & Earl"',
            'Earl E. owes you $32.18 for "Apartment stuff"',
        ],
       // image: require('./path/to/earl-image.png'),
    },
    {
        id: '2',
        name: 'Gajah',
        balance: 'settled up',
        // image: require('./path/to/gajah-image.png'),
    },
    // Add more friend data as needed
];

const FriendsScreen = ({ navigation }) => {
    const renderFriend = ({ item }) => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('Group', {
                    name: item.name,
                    balance: item.balance,
                })
            }
            key={item.id} className="flex-row items-center justify-between p-4 bg-[#F0F4F8] rounded-lg mb-4">
            <View className="flex-row items-center">
                {/*<Image source={item.image} className="w-10 h-10 rounded-full mr-3" />*/}
                <View>
                    <Text className="font-bold text-[#4A154B]">{item.name}</Text>
                    <Text className="text-sm text-gray-500">{item.balance}</Text>
                    {item.transactions?.map((text, index) => (
                        <Text key={index} className="text-xs text-gray-400">{text}</Text>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-[#4A154B] p-4">
            <View className="p-4 bg-[#E8F7EF] rounded-lg mb-4">
                <Text className="text-lg font-bold text-[#4A154B]">Total balance</Text>
                <Text className="text-lg text-[#FF0000]">You owe ₹775.25</Text>
                <Text className="text-lg text-[#2BAC76]">You are owed ₹132.06</Text>
            </View>
            <FlatList
                data={friendsData}
                renderItem={renderFriend}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default FriendsScreen;
