import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ExpensesWiget from "./PageLayout/Components/ExpensesWiget";
import Layout from "./PageLayout";
import renderFriend from "./PageLayout/Components/FriendTile";

const FriendsScreen = ({navigation}) => {
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

    const handlePress = (item) => {
        navigation.navigate('Group', { name: item.name, friendId: item.id });
    };



    return (
        <Layout>
            <ExpensesWiget />
            <FlatList
                data={friendsWithBalances}
                renderItem={({ item }) => renderFriend({ item, onPress: handlePress })}
            />
        </Layout>
    );
};

export default FriendsScreen;
