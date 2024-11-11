// src/PageLayout/Components/SelectedMembersDisplay.js
import React from 'react';
import { Text, View } from 'react-native';

const SelectedMembersDisplay = ({ selectedMembers, membersData }) => (
    <View className="mt-4">
        <Text className="text-gray-500">With:</Text>
        <View className="flex-row flex-wrap">
            {selectedMembers.map((memberId) => {
                const member = membersData.find((m) => m.id === memberId);
                return (
                    <View key={memberId} className="bg-gray-100 px-3 py-1 rounded-md m-1">
                        <Text className="text-[#4A154B] font-bold">{member?.name || 'You'}</Text>
                    </View>
                );
            })}
        </View>
    </View>
);

export default SelectedMembersDisplay;
