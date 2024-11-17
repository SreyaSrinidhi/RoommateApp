import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PasswordModal({ isVisible, onClose = () => {} }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert("Error", "Please enter and confirm your new password.");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        Alert.alert("Saved", "Your password has been updated.");
        setNewPassword('');
        setConfirmPassword('');
        onClose(); // Close the modal after saving
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-4/5 bg-[#EDEFF7] p-6 rounded-xl items-center relative">
                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} className="absolute top-4 right-4">
                        <Ionicons name="close" size={24} color="#4A154B" />
                    </TouchableOpacity>

                    <Text className="text-xl font-bold mb-4">Change Password</Text>

                    <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">New Password</Text>
                    <TextInput
                        value={newPassword}
                        placeholder='Enter new password'
                        onChangeText={setNewPassword}
                        secureTextEntry={true}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />

                    <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Confirm Password</Text>
                    <TextInput
                        value={confirmPassword}
                        placeholder='Confirm new password'
                        onChangeText={setConfirmPassword}
                        secureTextEntry={true}
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    />

                    <TouchableOpacity onPress={handleSave} className="bg-[#4B225F] p-3 rounded-md w-full items-center">
                        <Text className="text-white font-bold">Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
