import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpensesByGroup } from '../../../../../StateManagement/Slices/ExpensesSlice'; // Adjust path as necessary
import ExpenseItem from './Components/ExpenseItem'; // Your existing ExpenseItem component

const GroupExpensesPage = ({ groupId }) => {
    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expenses.expenses);
    const loading = useSelector((state) => state.expenses.loading);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (groupId) {
            dispatch(fetchExpensesByGroup(groupId))
                .unwrap() // Unwrap the promise to handle errors
                .catch((err) => {
                    console.error('Error fetching expenses:', err);
                    setError('Failed to load expenses. Please try again.');
                });
        } else {
            setError('Group ID is missing. Please select a group.');
        }
    }, [dispatch, groupId]);

    return (
        <Layout>
            {/* Group Balance Section */}
            <Layout.BalanceSection>
                <Text style={styles.balanceText}>Group Balance</Text>
                {/* Example Placeholder for Group Balance */}
                <Text style={styles.balanceValue}>$100.00</Text>
            </Layout.BalanceSection>

            {/* Expenses List */}
            <Layout.ScrollSection
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ExpenseItem {...item} />}
            />

            {/* Loading Indicator */}
            {loading && (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading expenses...</Text>
                </View>
            )}

            {/* Error Message */}
            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
        </Layout>
    );
};

const styles = StyleSheet.create({
    balanceText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    balanceValue: {
        fontSize: 24,
        color: '#FFD700',
        fontWeight: 'bold',
        marginTop: 8,
    },
    loadingContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    errorContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#FF6347',
    },
});

export default GroupExpensesPage;
