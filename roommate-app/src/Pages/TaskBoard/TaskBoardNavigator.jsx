import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TaskBoardPage from './PageLayout';
// import ShowAllTasks from './Pages/ShowAllTasks'; // Commented out the original component
import TaskCategoryPage from './Pages/TaskCategoryPage';

const Stack = createStackNavigator();

// Temporary placeholder component to display the alert
const UpcomingFeature = () => {
    React.useEffect(() => {
        alert("Upcoming feature for now!");
    }, []);
    return null; // No UI since we only want the alert
};

const TaskBoardNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#8A7191' }, // Pink header
                headerTintColor: '#FFFFFF', // White back arrow
                headerTitleStyle: { fontWeight: 'bold', fontSize: 20 }, // Bold title text
                headerBackTitleVisible: false, // Hide back title (e.g., "TaskBoardPage")
            }}
        >
            {/* Task Board Main Page */}
            <Stack.Screen
                name="TaskBoardPage"
                component={TaskBoardPage}
                options={{
                    headerShown: false, // Hide the header completely for the main task board page
                }}
            />
            {/* Show All Tasks */}
            <Stack.Screen
                name="ShowAllTasks"
                component={UpcomingFeature} // Use the placeholder component
                options={{
                    title: 'All Tasks', // Title for the Show All Tasks page
                }}
            />
            {/* Task Category Page */}
            <Stack.Screen
                name="TaskCategoryPage"
                component={TaskCategoryPage}
                options={({ route }) => ({
                    headerTitle: route.params?.category?.name || '', // Show category name only
                    headerStyle: { backgroundColor: '#8A7191' }, // Pink header
                    headerTintColor: '#FFFFFF', // White back arrow
                    headerTitleStyle: {
                        color: '#FFFFFF', // Mint green category name
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                    headerBackTitleVisible: false, // Remove "TaskBoardPage" back title
                })}
            />
        </Stack.Navigator>
    );
};

export default TaskBoardNavigator;
