// src/PageLayout/Components/AmountInput.js
import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AmountInput = ({ value, onChangeText }) => (
    <View className="flex-row items-center mt-6 space-x-2">
        <View className="bg-gray-100 p-2 rounded-md">
            <Icon name="dollar" size={20} color="#4A154B" />
        </View>
        <TextInput
            className="border-b border-green-500 flex-1 text-3xl text-[#4A154B]"
            placeholder="0.00"
            placeholderTextColor="#9E9E9E"
            value={value}
            onChangeText={onChangeText}
            keyboardType="numeric"
        />
    </View>
);

export default AmountInput;
