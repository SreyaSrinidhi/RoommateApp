// AddExpenseScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Modal, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddExpenseScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [splitModalVisible, setSplitModalVisible] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState(['You']); // Include "You" by default
    const [splitPercentages, setSplitPercentages] = useState({ You: '100' }); // Start with "You" at 100%
    const [splitType, setSplitType] = useState('equally'); // Track split type ("equally" or "custom")

    const membersData = [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
        { id: '3', name: 'Charlie' },
        // Add more members as needed
    ];

    useEffect(() => {
        // Update splits equally when selectedMembers changes
        if (selectedMembers.length > 0) {
            const equalSplit = (100 / selectedMembers.length).toFixed(2);
            const initialSplits = selectedMembers.reduce((acc, member) => {
                acc[member] = equalSplit;
                return acc;
            }, {});
            setSplitPercentages(initialSplits);
            setSplitType('equally');
        }
    }, [selectedMembers]);

    const toggleMember = (member) => {
        if (selectedMembers.includes(member.name)) {
            // Remove member and update splits
            setSelectedMembers(selectedMembers.filter((m) => m !== member.name));
            const updatedSplit = { ...splitPercentages };
            delete updatedSplit[member.name];
            setSplitPercentages(updatedSplit);
        } else {
            // Add member
            setSelectedMembers([...selectedMembers, member.name]);
        }
    };

    const handleSplitChange = (name, value) => {
        // Update split percentages and set splitType to "custom" if changes are detected
        if (!isNaN(value) && value.trim() !== '') {
            setSplitPercentages({
                ...splitPercentages,
                [name]: value,
            });

            const equalSplit = (100 / selectedMembers.length).toFixed(2);
            const isCustom = Object.values({
                ...splitPercentages,
                [name]: value,
            }).some((percent) => percent !== equalSplit);
            setSplitType(isCustom ? 'custom' : 'equally');
        } else if (value.trim() === '') {
            setSplitPercentages({
                ...splitPercentages,
                [name]: '',
            });
        }
    };

    const saveExpense = () => {
        if (!amount || selectedMembers.length === 0) {
            Alert.alert("Incomplete Data", "Please enter an amount and select at least one member.");
            return;
        }

        // Here you can add functionality to save the expense, e.g., send it to an API or update a state.
        console.log("Expense Saved:", {
            amount,
            selectedMembers,
            splitPercentages,
            splitType,
        });

        Alert.alert("Success", "Expense has been saved.");
        navigation.goBack(); // Go back after saving (optional)
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View className="flex-1 bg-white px-4 items-center">
                {/* Expense Description */}
                <View className="flex-row items-center space-x-2 mt-4">
                    <View className="bg-[#E0F7E9] p-2 rounded-md">
                        <Icon name={'pencil'} size={20} color="#4A154B" />
                    </View>
                    <TextInput
                        className="border-b border-gray-300 flex-1 text-lg text-[#4A154B]"
                        placeholder="Discription"
                        placeholderTextColor="#9E9E9E"
                    />
                </View>

                {/* Amount Input */}
                <View className="flex-row items-center mt-6 space-x-2">
                    <View className="bg-gray-100 p-2 rounded-md">
                        <Icon name="dollar" size={20} color="#4A154B" />
                    </View>
                    <TextInput
                        className="border-b border-green-500 flex-1 text-3xl text-[#4A154B]"
                        placeholder="0.00"
                        placeholderTextColor="#9E9E9E"
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                    />
                </View>

                {/* Payment Info */}
                <View className="flex-row items-center mt-6 space-x-2">
                    <Text className="text-gray-500">Paid by</Text>
                    <TouchableOpacity className="bg-gray-100 px-3 py-1 rounded-md">
                        <Text className="text-[#4A154B] font-bold">you</Text>
                    </TouchableOpacity>
                    <Text className="text-gray-500">and split</Text>
                    <TouchableOpacity
                        className="bg-gray-100 px-3 py-1 rounded-md"
                        onPress={() => setSplitModalVisible(true)}
                    >
                        <Text className="text-[#4A154B] font-bold">{splitType}</Text>
                    </TouchableOpacity>
                </View>

                {/* Add Members Button */}
                <TouchableOpacity
                    className="bg-[#E0F7E9] mt-6 px-4 py-2 rounded-md flex-row items-center"
                    onPress={() => setModalVisible(true)}
                >
                    <Icon name="users" size={20} color="#4A154B" />
                    <Text className="ml-2 text-[#4A154B] font-bold">Add Members</Text>
                </TouchableOpacity>

                {/* Selected Members Display */}
                {selectedMembers.length > 0 && (
                    <View className="mt-4">
                        <Text className="text-gray-500">With:</Text>
                        <View className="flex-row flex-wrap">
                            {selectedMembers.map((member, index) => (
                                <View key={index} className="bg-gray-100 px-3 py-1 rounded-md m-1">
                                    <Text className="text-[#4A154B] font-bold">{member}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Modal for Selecting Members */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                        <View className="bg-white p-4 rounded-lg w-3/4">
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
                                        {selectedMembers.includes(item.name) && (
                                            <Icon name="check" size={20} color="#2BAC76" />
                                        )}
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity
                                className="bg-[#2BAC76] mt-4 p-2 rounded-lg items-center"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text className="text-white font-bold">Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Modal for Split Percentage */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={splitModalVisible}
                    onRequestClose={() => setSplitModalVisible(false)}
                >
                    <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                        <View className="bg-white p-4 rounded-lg w-3/4">
                            <Text className="text-lg font-bold text-[#4A154B] mb-4">Set Split Percentages</Text>
                            {selectedMembers.map((member) => (
                                <View key={member} className="flex-row justify-between items-center py-2">
                                    <Text className="text-[#4A154B]">{member}</Text>
                                    <TextInput
                                        className="border border-gray-300 rounded-md px-2 py-1 text-right"
                                        placeholder="0"
                                        placeholderTextColor="#9E9E9E"
                                        keyboardType="numeric"
                                        value={splitPercentages[member]?.toString() || ''}
                                        onChangeText={(value) => handleSplitChange(member, value)}
                                    />
                                    <Text className="text-[#4A154B] ml-2">%</Text>
                                </View>
                            ))}
                            <TouchableOpacity
                                className="bg-[#2BAC76] mt-4 p-2 rounded-lg items-center"
                                onPress={() => setSplitModalVisible(false)}
                            >
                                <Text className="text-white font-bold">Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Save Expense Button */}
                <TouchableOpacity
                    className="bg-[#4A154B] mt-8 px-8 py-4 rounded-lg items-center"
                    onPress={saveExpense}
                >
                    <Text className="text-white font-bold">Save Expense</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default AddExpenseScreen;

