// src/PageLayout/Components/SplitPercentageModal.js
import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

const SplitPercentageModal = ({ selectedMembers, membersData, splitPercentages, setSplitPercentages, onClose }) => (
    <View className={'bg-white p-4 rounded-lg w-3/4'}>
        <Text className="text-lg font-bold text-[#4A154B] mb-4">Set Split Percentages</Text>
        {selectedMembers.map((memberId) => {
            const member = membersData.find((m) => m.id === memberId);
            return (
                <View key={memberId} className="flex-row justify-between items-center py-2">
                    <Text className="text-[#4A154B]">{member?.name || 'You'}</Text>
                    <TextInput
                        className="border border-gray-300 rounded-md px-2 py-1 text-right"
                        placeholder="0"
                        placeholderTextColor="#9E9E9E"
                        keyboardType="numeric"
                        value={splitPercentages[member?.name]?.toString() || ''}
                        onChangeText={(value) => setSplitPercentages((prev) => ({ ...prev, [member?.name]: value }))}
                    />
                    <Text className="text-[#4A154B] ml-2">%</Text>
                </View>
            );
        })}
        <TouchableOpacity className="bg-[#2BAC76] mt-4 p-2 rounded-lg items-center" onPress={onClose}>
            <Text className="text-white font-bold">Done</Text>
        </TouchableOpacity>
    </View>

);

export default SplitPercentageModal;
