import React from 'react';
import { View, Text } from 'react-native';

const BalanceHeader = ({ name, balance }) => (
    <View className="mb-4">
        <View className="p-4 bg-[#EDEFF7] rounded-lg flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-[#4A154B]">{name}</Text>
            <Text className={`font-bold ${balance >= 0 ? 'text-[#2BAC76]' : 'text-[#FF0000]'}`}>
                {balance >= 0 ? `owes you $${balance.toFixed(2)}` : `is owed from you $${Math.abs(balance).toFixed(2)}`}
            </Text>
        </View>
    </View>
);

export default BalanceHeader;
