// src/PageLayout/Components/AddMembersButton.js
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddMembersButton = ({ onPress }) => (
    <TouchableOpacity
        className="bg-[#E0F7E9] mt-6 px-4 py-2 rounded-md flex-row items-center"
        onPress={onPress}
    >
        <Icon name="users" size={20} color="#4A154B" />
        <Text className="ml-2 text-[#4A154B] font-bold">Add Members</Text>
    </TouchableOpacity>
);

export default AddMembersButton;
