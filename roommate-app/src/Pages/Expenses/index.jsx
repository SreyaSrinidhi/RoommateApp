import React, { useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ExpensesProvider, useExpenses } from './Context';
import FriendsScreen from './Pages/FriendsPage';
import GroupScreen from './Pages/GroupExpenses';
import AddExpensePage from './Pages/AddExpensePage';

const Stack = createStackNavigator();

const FriendsStack = ({ navigation }) => {
    const { setParentNavigation } = useExpenses();

    useEffect(() => {
        setParentNavigation(navigation);
    }, [navigation]);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Friends"
                component={FriendsScreen}
            />
            <Stack.Screen name="AddExpense" component={AddExpensePage} />
            <Stack.Screen
                name="Group"
                component={GroupScreen}
            />
        </Stack.Navigator>
    );
};

const FriendsStackWithProvider = ({ navigation }) => (
    <ExpensesProvider>
        <FriendsStack navigation={navigation} />
    </ExpensesProvider>
);

export default FriendsStackWithProvider;
