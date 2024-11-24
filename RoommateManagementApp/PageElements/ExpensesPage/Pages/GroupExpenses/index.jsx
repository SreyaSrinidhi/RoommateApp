import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { settleExpense } from '../../../../StateManagement/Slices/ExpensesSlice';
import Layout from './PageLayout';
import BalanceHeader from './PageLayout/Components/BalanceHeader';
import ExpenseItem from './PageLayout/Components/ExpenseItem';
import SettleExpenseModalContent from './PageLayout/Components/SettleExpenseModalContent';

const GroupPage = ( { name, friendId }) => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const expenses = useSelector((state) =>
        state.expenses.expenses.filter((expense) => expense.friendId === friendId)
    );

    const balance = expenses.reduce((acc, item) => {
        return item.type === 'lent' ? acc + item.amount : acc - item.amount;
    }, 0);

    const handleExpensePress = (expense) => {
        setSelectedExpense(expense);
        setModalVisible(true);
    };

    const handleSettleExpense = () => {
        dispatch(settleExpense({ expenseId: selectedExpense.id, friendId }));
        setModalVisible(false);
        Alert.alert("Expense Settled", `The expense "${selectedExpense.description}" has been settled.`);
        setSelectedExpense(null);
    };

    return (
        <Layout>
            <Layout.BalanceSection>
                <BalanceHeader name={name} balance={balance} />
            </Layout.BalanceSection>

            <Layout.ScrollSection
                data={expenses}
                renderItem={({ item }) => <ExpenseItem item={item} onPress={handleExpensePress} />}
                keyExtractor={(item) => item.id}
            />

            <Layout.SettleExpenseModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <SettleExpenseModalContent expense={selectedExpense} onConfirm={handleSettleExpense} onClose={() => setModalVisible(false)} />
            </Layout.SettleExpenseModal>
        </Layout>
    );
};

export default GroupPage;