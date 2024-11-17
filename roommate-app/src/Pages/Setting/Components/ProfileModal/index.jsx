import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileModal({ isVisible, onClose = () => {} }) {
    const [currentName, setCurrentName] = useState('John Doe'); // Default name
    const [name, setName] = useState(currentName); // Editable name field

    const handleSave = () => {
        if (name === currentName) {
            Alert.alert("Error", "Please change the name before saving.");
        } else {
            setCurrentName(name);
            Alert.alert("Saved", "Your profile has been updated.");
            onClose(); // Close the modal after saving
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-4/5 bg-[#EDEFF7] p-6 rounded-xl items-center relative">
                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} className="absolute top-4 right-4">
                        <Ionicons name="close" size={24} color="#4A154B" />
                    </TouchableOpacity>

                    <Text className="text-xl font-bold mb-4">Edit Profile</Text>
                    <Text className="text-lg text-[#4A154B] mb-4">Your name is: {currentName}</Text>

                    <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Change Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        placeholder="Enter your name"
                    />

                    <TouchableOpacity className="bg-[#8CC49F] p-3 rounded-md mb-4 w-full items-center">
                        <Text className="text-white font-bold">Change Profile Picture</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSave} className="bg-[#4B225F] p-3 rounded-md w-full items-center">
                        <Text className="text-white font-bold">Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
