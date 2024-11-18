// src/PageLayout/Components/SaveExpenseButton.js
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const SaveExpenseButton = ({ onPress }) => (
    <TouchableOpacity className="bg-[#4A154B] mt-8 px-8 py-4 rounded-lg items-center" onPress={onPress}>
        <Text className="text-white font-bold">Save Expense</Text>
    </TouchableOpacity>
);

export default SaveExpenseButton;
