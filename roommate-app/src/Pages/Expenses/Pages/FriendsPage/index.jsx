import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import FriendTile from "./PageLayout/Components/FriendTile";
import Layout from "./PageLayout";

const FriendsScreen = () => {
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



    return (
        <Layout>
            <ExpensesWiget />
            <FlatList
                data={friendsWithBalances}
                renderItem={FriendTile}
                keyExtractor={(item) => item.id}
            />
        </Layout>
    );
};

export default FriendsScreen;
