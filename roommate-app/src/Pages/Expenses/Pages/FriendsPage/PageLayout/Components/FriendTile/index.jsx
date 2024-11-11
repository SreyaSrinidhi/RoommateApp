import {Text, TouchableOpacity, View} from "react-native";
import React from "react";

const renderFriend = ({ item }) => (
    <TouchableOpacity
        onPress={() => navigation.navigate('Group', { name: item.name, friendId: item.id })}
        key={item.id}
        className="flex-row items-center justify-between p-4 bg-[#F0F4F8] rounded-lg mb-4"
    >
        <View>
            <Text className="font-bold text-[#4A154B]">{item.name}</Text>
            <Text className="text-sm text-gray-500">Balance: ${item.balance}</Text>
            {item.transactions.slice(0,2).map((transaction, index) => (
                <Text key={index} className="text-xs text-gray-400">
                    {transaction.description}: ${transaction.amount.toFixed(2)}
                </Text>
            ))}
        </View>
    </TouchableOpacity>
);

export default renderFriend;
