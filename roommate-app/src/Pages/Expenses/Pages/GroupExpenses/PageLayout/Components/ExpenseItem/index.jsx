import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const ExpenseItem = ({ item, onPress }) => (
    <TouchableOpacity onPress={() => onPress(item)}>
        <View className="flex-row bg-[#EDEFF7] justify-between p-4 rounded-3xl border-b border-gray-200">
            <View>
                <Text className="text-gray-500 text-xs">{item.date}</Text>
                <Text className="font-bold text-[#4A154B]">{item.description}</Text>
            </View>
            <Text className={`font-bold ${item.type === 'borrowed' ? 'text-[#FF0000]' : 'text-[#2BAC76]'}`}>
                ${item.amount.toFixed(2)}
            </Text>
        </View>
    </TouchableOpacity>
);

export default ExpenseItem;
