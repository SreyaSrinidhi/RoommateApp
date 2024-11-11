import React from 'react';
import {TextInput, View} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

const ExpenseDescriptionInput = ({ value, onChangeText }) => (
    <View className="flex-row items-center space-x-2 mt-4">
        <View className="bg-[#E0F7E9] p-2 rounded-md">
            <Icon name="pencil" size={20} color="#4A154B" />
        </View>
        <TextInput
            className="border-b border-gray-300 flex-1 text-lg text-[#4A154B]"
            placeholder="Description"
            placeholderTextColor="#9E9E9E"
            value={value}
            onChangeText={onChangeText}
        />
    </View>
);

export default ExpenseDescriptionInput;
