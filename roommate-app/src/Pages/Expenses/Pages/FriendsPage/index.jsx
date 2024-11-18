import React, {useEffect, useLayoutEffect} from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ExpensesWiget from "./PageLayout/Components/ExpensesWiget";
import Layout from "./PageLayout";
import renderFriend from "./PageLayout/Components/FriendTile";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useExpenses } from "../../Context/";

const FriendsScreen = ({ navigation }) => {
    const friends = useSelector((state) => state.expenses.friends);
    const expenses = useSelector((state) => state.expenses.expenses);
    const { parentNavigation } = useExpenses();

    // Update headerRight button in the parent navigation
    useEffect(() => {
        if (parentNavigation) {
            parentNavigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("AddExpense")}
                        style={styles.headerButton}
                    >
                        <Ionicons name="add-circle-outline" size={30} color="black" />
                    </TouchableOpacity>
                ),
            });
        }

        const unsubscribe = () => {
            if (parentNavigation) {
                parentNavigation.setOptions({
                    headerRight: null,
                });
            }
        }

        return unsubscribe;
    }, [navigation, parentNavigation]);

    // Map expenses to each friend
    const friendsWithBalances = friends.map((friend) => {
        const friendExpenses = expenses.filter((expense) => expense.friendId === friend.id);
        const balance = friendExpenses.reduce(
            (total, expense) => total + (expense.type === 'lent' ? expense.amount : -expense.amount),
            0
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
        <Layout testID='expenses-friends-page'>
            <ExpensesWiget />
            <FlatList
                data={friendsWithBalances}
                keyExtractor={(item) => item.id.toString()} // Ensure unique keys
                renderItem={({ item }) => renderFriend({ item, onPress: handlePress })}
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    headerButton: {
        marginRight: 15,
    },
});

export default FriendsScreen;
