// src/PageLayout/Components/MembersModal.js
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MembersModal = ({ membersData, selectedMembers, toggleMember, onClose }) => (
    <View className={'bg-white p-4 rounded-lg w-3/4'}>
        <Text className="text-lg font-bold text-[#4A154B] mb-4">Select Members</Text>
        <FlatList
            data={membersData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className="flex-row justify-between items-center py-2"
                    onPress={() => toggleMember(item)}
                >
                    <Text className="text-[#4A154B]">{item.name}</Text>
                    {selectedMembers.includes(item.id) && (
                        <Icon name="check" size={20} color="#2BAC76" />
                    )}
                </TouchableOpacity>
            )}
        />
        <TouchableOpacity className="bg-[#2BAC76] mt-4 p-2 rounded-lg items-center" onPress={onClose}>
            <Text className="text-white font-bold">Done</Text>
        </TouchableOpacity>
    </View>
);

export default MembersModal;
