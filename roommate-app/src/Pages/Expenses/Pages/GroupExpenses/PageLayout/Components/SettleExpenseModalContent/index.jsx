// src/Components/SettleExpenseModal.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SettleExpenseModalContent = ({ expense, onConfirm, onClose }) => (
    <View className="bg-white p-6 rounded-lg w-3/4 items-center">
        <Text className="text-lg font-bold text-[#4A154B] mb-4">Settle Expense</Text>
        <Text className="text-gray-700 mb-4">
            Do you want to settle the expense "{expense?.description}"?
        </Text>
        <View className="flex-row space-x-4">
            <TouchableOpacity className="bg-[#2BAC76] px-4 py-2 rounded-md" onPress={onConfirm}>
                <Text className="text-white font-bold">Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-300 px-4 py-2 rounded-md" onPress={onClose}>
                <Text className="text-gray-700 font-bold">No</Text>
            </TouchableOpacity>
        </View>
    </View>
);

export default SettleExpenseModalContent;
