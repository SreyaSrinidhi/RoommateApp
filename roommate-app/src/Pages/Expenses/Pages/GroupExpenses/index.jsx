// src/Pages/GroupScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { settleExpense } from '../../../../StateManagement/Slices/ExpensesSlice' // Import the settleExpense action

const GroupScreen = ({ route }) => {
    const { name, friendId } = route.params;
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    // Select expenses related to this friend from Redux
    const expenses = useSelector((state) =>
        state.expenses.expenses.filter((expense) => expense.friendId === friendId)
    );

    // Calculate the balance by summing up the 'lent' and 'borrowed' amounts
    const balance = expenses.reduce((acc, item) => {
        return item.type === 'lent' ? acc + item.amount : acc - item.amount;
    }, 0);

    const handleExpensePress = (expense) => {
        setSelectedExpense(expense);
        setModalVisible(true);
    };

    const handleSettleExpense = () => {
        dispatch(settleExpense({ expenseId: selectedExpense.id, friendId })); // Dispatch action to settle expense
        setModalVisible(false);
        Alert.alert("Expense Settled", `The expense "${selectedExpense.description}" has been settled.`);
        setSelectedExpense(null);
    };

    const renderExpense = ({ item }) => (
        <TouchableOpacity onPress={() => handleExpensePress(item)}>
            <View className="flex-row bg-[#EDEFF7] justify-between p-4 rounded-3xl border-b border-gray-200">
                <View>
                    <Text className="text-gray-500 text-xs">{item.date}</Text>
                    <Text className="font-bold text-[#4A154B]">{item.description}</Text>
                </View>
                <Text className={`font-bold ${item.type === 'borrowed' ? 'text-[#FF0000]' : 'text-[#2BAC76]'}`}>
                    ${item.amount.toFixed(2)}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-[#4A154B] p-4">
            <View className="p-4 bg-[#EDEFF7] rounded-lg mb-4 flex-row justify-between items-center">
                <Text className="text-2xl font-bold text-[#4A154B]">{name}</Text>
                <Text className={`font-bold ${balance >= 0 ? 'text-[#2BAC76]' : 'text-[#FF0000]'}`}>
                    {balance >= 0 ? `owes you $${balance.toFixed(2)}` : `is owed from you $${Math.abs(balance).toFixed(2)}`}
                </Text>
            </View>

            <FlatList
                ItemSeparatorComponent={() => <View className="h-3" />}
                data={expenses}
                renderItem={renderExpense}
                keyExtractor={(item) => item.id}
            />

            {/* Settle Expense Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                    <View className="bg-white p-6 rounded-lg w-3/4 items-center">
                        <Text className="text-lg font-bold text-[#4A154B] mb-4">
                            Settle Expense
                        </Text>
                        <Text className="text-gray-700 mb-4">
                            Do you want to settle the expense "{selectedExpense?.description}"?
                        </Text>
                        <View className="flex-row space-x-4">
                            <TouchableOpacity
                                className="bg-[#2BAC76] px-4 py-2 rounded-md"
                                onPress={handleSettleExpense}
                            >
                                <Text className="text-white font-bold">Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-gray-300 px-4 py-2 rounded-md"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text className="text-gray-700 font-bold">No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default GroupScreen;
