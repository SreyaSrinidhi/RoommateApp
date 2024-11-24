import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux"; // Import from Redux

const TaskBoardWidget = () => {
    const categories = useSelector((state) => state.taskBoard.categories); // Fetch categories from Redux

    const getTasksWithDeadlines = () => {
        const tasksWithDeadlines = [];

        if (categories) {
            categories.forEach((category) => {
                category.tasks.forEach((task) => {
                    if (
                        task.assignedTo?.toLowerCase() === "you" && // Assigned to "you"
                        task.deadline && // Has a deadline
                        task.status !== "done" // Exclude done tasks
                    ) {
                        tasksWithDeadlines.push({
                            ...task,
                            categoryName: category.name,
                        });
                    }
                });
            });
        }

        return tasksWithDeadlines.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)); // Sort tasks by deadline
    };

    const tasks = getTasksWithDeadlines();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Upcoming Tasks</Text>
            {tasks.length > 0 ? (
                tasks.slice(0, 3).map((task) => (
                    <View key={task.id} style={styles.taskItem}>
                        <Text style={styles.taskName}>{task.name}</Text>
                        <Text style={styles.taskCategory}>{task.categoryName}</Text>
                        <Text style={styles.taskDate}>{task.deadline}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noTasks}>All your tasks are done! Hooray!</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width - 32, // Full width minus padding/margin
        backgroundColor: "#EDEFF7",
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16, // Center the widget
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#4B225F",
        marginBottom: 12,
    },
    taskItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#A0D8B3", // Mint green background for individual tasks
        borderRadius: 8,
    },
    taskName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4B225F", // Dark text for mint background
        marginBottom: 4,
    },
    taskCategory: {
        fontSize: 14,
        color: "#4B225F", // Dark text for category
        marginBottom: 4,
    },
    taskDate: {
        fontSize: 14,
        color: "#4B225F", // Dark text for deadline
    },
    noTasks: {
        fontSize: 14,
        color: "#4B225F",
        textAlign: "center",
        marginTop: 10,
    },
});

export default TaskBoardWidget;
