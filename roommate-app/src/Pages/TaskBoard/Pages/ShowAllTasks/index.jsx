import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { TaskBoardContext } from '../../Context';
import EditTaskModal from '../../PageLayout/Components/EditTaskModal';

const ShowAllTasks = ({ navigation }) => {
    const { categories, setCategories } = useContext(TaskBoardContext);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    // Default sorting: Pending first, then Done
    const sortByDefault = (tasks) => {
        const pendingTasks = tasks.filter((task) => task.status !== 'done');
        const doneTasks = tasks.filter((task) => task.status === 'done');
        return [...pendingTasks, ...doneTasks];
    };

    // Extract tasks assigned to "You" and include the category reference
    const userTasks = categories.flatMap((category) =>
        category.tasks
            .filter((task) => task.assignedTo?.toLowerCase() === 'you') // Case-insensitive filter
            .map((task) => ({ ...task, categoryName: category.name })) // Add category name
    );

    const [sortedTasks, setSortedTasks] = useState(sortByDefault(userTasks)); // Initialize with default sort
    const [isSorted, setIsSorted] = useState(false); // Track sorting state

    // Sort by Deadline
    const sortByDeadline = () => {
        const tasksWithDeadline = [...sortedTasks].filter((task) => task.deadline);
        const tasksWithoutDeadline = [...sortedTasks].filter((task) => !task.deadline);

        // Sort tasks with deadlines in ascending order
        tasksWithDeadline.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

        setSortedTasks([...tasksWithDeadline, ...tasksWithoutDeadline]); // Append tasks without deadlines at the end
        setIsSorted(true); // Indicate that tasks are sorted
    };

    // Unsort and return to default format
    const unsortTasks = () => {
        setSortedTasks(sortByDefault(userTasks)); // Reset to default sorting
        setIsSorted(false); // Indicate that tasks are unsorted
    };

    // Update task in context
    const updateTaskInContext = (updatedTask) => {
        const updatedCategories = categories.map((category) => {
            if (category.name === updatedTask.categoryName) {
                return {
                    ...category,
                    tasks: category.tasks.map((task) =>
                        task.id === updatedTask.id ? updatedTask : task
                    ),
                };
            }
            return category;
        });
        setCategories(updatedCategories);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#4B225F', padding: 16 }}>
            <ScrollView>
                {sortedTasks.length > 0 ? (
                    sortedTasks.map((task) => (
                        <TouchableOpacity
                            key={task.id}
                            style={{
                                backgroundColor: task.status === 'done' ? '#A0D8B3' : '#EDEFF7',
                                padding: 16,
                                marginBottom: 8,
                                borderRadius: 16,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 2,
                            }}
                            onPress={() => {
                                setSelectedTask(task);
                                setIsEditModalVisible(true);
                            }}
                        >
                            <Text
                                style={{
                                    color: '#4B225F',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}
                            >
                                {task.name || 'Untitled Task'}
                            </Text>
                            <Text style={{ color: '#4B225F', fontSize: 14 }}>
                                Description: {task.description || 'No description provided'}
                            </Text>
                            <Text style={{ color: '#4B225F', fontSize: 14 }}>
                                Deadline: {task.deadline || 'No deadline'}
                            </Text>
                            <Text style={{ color: '#4B225F', fontSize: 14 }}>
                                Category: {task.categoryName}
                            </Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text
                        style={{
                            color: '#FFFFFF',
                            textAlign: 'center',
                            marginTop: 20,
                        }}
                    >
                        No tasks assigned to you.
                    </Text>
                )}
            </ScrollView>

            {/* Sort/Unsort Text */}
            <TouchableOpacity
                onPress={isSorted ? unsortTasks : sortByDeadline}
                style={{
                    alignSelf: 'center',
                    marginTop: 16,
                }}
            >
                <Text style={{ color: '#8CC49F', fontWeight: 'bold', fontSize: 16 }}>
                    {isSorted ? 'Unsort' : 'Sort by Deadline'}
                </Text>
            </TouchableOpacity>

            {/* Back Button */}
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    backgroundColor: '#8CC49F',
                    padding: 16,
                    borderRadius: 16,
                    alignItems: 'center',
                    marginTop: 16,
                }}
            >
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }}>Back</Text>
            </TouchableOpacity>

            {/* Edit Task Modal */}
            {selectedTask && (
                <EditTaskModal
                    visible={isEditModalVisible}
                    task={selectedTask}
                    category={{ name: selectedTask.categoryName }}
                    onClose={() => {
                        setSelectedTask(null);
                        setIsEditModalVisible(false);
                    }}
                    onSave={(updatedTask) => {
                        updateTaskInContext(updatedTask);
                        setIsEditModalVisible(false);
                    }}
                />
            )}
        </View>
    );
};

export default ShowAllTasks;
