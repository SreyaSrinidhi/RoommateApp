// src/PageLayout/Components/PaymentInfo.js
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const PaymentInfo = ({ splitType, onPressSplit }) => (
    <View className="flex-row w-full items-center mt-6 space-x-2">
        <Text className="text-gray-500">Paid by</Text>
        <TouchableOpacity className="bg-gray-100 px-3 py-1 rounded-md">
            <Text className="text-[#4A154B] font-bold">you</Text>
        </TouchableOpacity>
        <Text className="text-gray-500">and split</Text>
        <TouchableOpacity
            className="bg-gray-100 px-3 py-1 rounded-md"
            onPress={onPressSplit}
        >
            <Text className="text-[#4A154B] font-bold">{splitType}</Text>
        </TouchableOpacity>
    </View>
);

export default PaymentInfo;
