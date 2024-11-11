// src/Components/FriendsStack.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FriendsScreen from './Pages/FriendsPage';
import GroupScreen from './Pages/GroupExpenses';
import AddExpensePage from "./Pages/AddExpensePage";

const Stack = createStackNavigator();

const FriendsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Friends"
                component={FriendsScreen}
                options={({ navigation }) => ({
                    title: " ",
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("AddExpense")}>
                            <Text style={{ fontSize: 18, marginRight: 10 }}>+</Text>
                        </TouchableOpacity>
                    ),
            })}// Hide header for FriendsScreen
            />
            <Stack.Screen
                name={"AddExpense"}
                component={AddExpensePage}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{ fontSize: 18, marginLeft: 10 }}>X</Text>
                        </TouchableOpacity>
                    ),
                })}
            />
            <Stack.Screen
                name="Group"
                component={GroupScreen}
                options={({ navigation }) => ({
                    title: " ",
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{ fontSize: 18, marginLeft: 10 }}>← Back</Text>
                        </TouchableOpacity>
                    ),
                })}
            />
        </Stack.Navigator>
    );
};

export default FriendsStack;
