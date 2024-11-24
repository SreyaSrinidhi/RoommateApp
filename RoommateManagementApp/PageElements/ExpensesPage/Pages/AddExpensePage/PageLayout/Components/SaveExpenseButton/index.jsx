import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../../../../../../StateManagement/Slices/ExpensesSlice'; // Adjust the path as per your project structure

const SaveExpenseButton = ({ groupId, expenseData }) => {
    const dispatch = useDispatch();

    const handleSave = async () => {
        if (!groupId || !expenseData) {
            console.error('Group ID or expense data is missing!');
            return;
        }

        // Dispatch the addExpense action with the groupId and expenseData
        dispatch(addExpense({ groupId, expense: expenseData }));
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Expense</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4A154B', // bg-[#4A154B]
        marginTop: 32, // mt-8
        paddingHorizontal: 32, // px-8
        paddingVertical: 16, // py-4
        borderRadius: 12, // rounded-lg
        alignItems: 'center', // items-center
    },
    buttonText: {
        color: '#FFFFFF', // text-white
        fontWeight: 'bold', // font-bold
    },
});

export default SaveExpenseButton;
