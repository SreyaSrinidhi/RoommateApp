import {Text, View} from "react-native";
import React from "react";
import {useSelector} from "react-redux";

const ExpensesWiget =() =>{

    const expenses = useSelector((state) => state.expenses.expenses);

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

    return(
        <View className="p-4 bg-[#E8F7EF] rounded-lg mb-4">
            <Text className="text-lg font-bold text-[#4A154B]">Total balance</Text>
            <Text className="text-lg text-[#FF0000]">You owe ${totalBalances.youOwe.toFixed(2)}</Text>
            <Text className="text-lg text-[#2BAC76]">You are owed ${totalBalances.youAreOwed.toFixed(2)}</Text>
        </View>

    )
}

export default ExpensesWiget;
