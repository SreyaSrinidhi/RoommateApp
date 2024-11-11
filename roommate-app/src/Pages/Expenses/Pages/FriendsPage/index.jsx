// src/Pages/FriendsScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const FriendsScreen = ({ navigation }) => {
    const friends = useSelector((state) => state.expenses.friends);
    const expenses = useSelector((state) => state.expenses.expenses);

    // Map expenses to each friend
    const friendsWithBalances = friends.map((friend) => {
        const friendExpenses = expenses.filter(expense => expense.friendId === friend.id);
        const balance = friendExpenses.reduce(
            (total, expense) => total + (expense.type === 'lent' ? expense.amount : -expense.amount), 0
        );
        return {
            ...friend,
            balance: balance.toFixed(2),
            transactions: friendExpenses,
        };
    });

    // Calculate total "You owe" and "You are owed" amounts
    const totalBalances = expenses.reduce(
        (totals, expense) => {
            if (expense.type === 'lent') {
                totals.youAreOwed += expense.amount;
            } else {
                totals.youOwe += expense.amount;
            }
            return totals;
        },
        { youOwe: 0, youAreOwed: 0 }
    );

    const renderFriend = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Group', { name: item.name, friendId: item.id })}
            key={item.id}
            className="flex-row items-center justify-between p-4 bg-[#F0F4F8] rounded-lg mb-4"
        >
            <View>
                <Text className="font-bold text-[#4A154B]">{item.name}</Text>
                <Text className="text-sm text-gray-500">Balance: ₹{item.balance}</Text>
                {item.transactions.slice(0,2).map((transaction, index) => (
                    <Text key={index} className="text-xs text-gray-400">
                        {transaction.description}: ₹{transaction.amount.toFixed(2)}
                    </Text>
                ))}
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-[#4A154B] p-4">
            {/* Dynamic Total Balance Section */}
            <View className="p-4 bg-[#E8F7EF] rounded-lg mb-4">
                <Text className="text-lg font-bold text-[#4A154B]">Total balance</Text>
                <Text className="text-lg text-[#FF0000]">You owe ₹{totalBalances.youOwe.toFixed(2)}</Text>
                <Text className="text-lg text-[#2BAC76]">You are owed ₹{totalBalances.youAreOwed.toFixed(2)}</Text>
            </View>

            {/* Friends List */}
            <FlatList
                data={friendsWithBalances}
                renderItem={renderFriend}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default FriendsScreen;
