import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TaskBoardPage from './PageLayout';
import ShowAllTasks from './Pages/ShowAllTasks';
import TaskCategoryPage from './Pages/TaskCategoryPage';

const Stack = createStackNavigator();

const TaskBoardNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#8A7191' },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
            }}
        >
            <Stack.Screen
                name="TaskBoardPage"
                component={TaskBoardPage}
                options={{ title: 'Task Board' }}
            />
            <Stack.Screen
                name="ShowAllTasks"
                component={ShowAllTasks}
                options={{ title: 'All Tasks' }}
            />
            <Stack.Screen
                name="TaskCategoryPage"
                component={TaskCategoryPage}
                options={({ route }) => ({
                    title: route.params?.category?.name || 'Category',
                })}
            />
        </Stack.Navigator>
    );
};

export default TaskBoardNavigator;
