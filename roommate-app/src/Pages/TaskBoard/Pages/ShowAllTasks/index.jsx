import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { editTask } from '../../../../StateManagement/Slices/TaskBoardSlice'; // Adjust the path
import EditTaskModal from './../../PageLayout/Components/EditTaskModal';

const ShowAllTasks = ({ navigation }) => {
    const categories = useSelector((state) => state.taskBoard.categories); // Fetch categories from Redux
    const dispatch = useDispatch();

    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [userTasks, setUserTasks] = useState([]);
    const [isSorted, setIsSorted] = useState(false); // Track sorting state

    // Dynamically fetch tasks assigned to "You" whenever categories change
    useEffect(() => {
        const tasks = categories.flatMap((category) =>
            category.tasks
                .filter((task) => task.assignedTo?.toLowerCase() === 'you') // Filter tasks assigned to "You"
                .map((task) => ({ ...task, categoryName: category.name })) // Add category reference
        );
        setUserTasks(sortByDefault(tasks)); // Initialize with default sort
    }, [categories]);

    // Default sorting: Pending first, then Done
    const sortByDefault = (tasks) => {
        const pendingTasks = tasks.filter((task) => task.status !== 'done');
        const doneTasks = tasks.filter((task) => task.status === 'done');
        return [...pendingTasks, ...doneTasks];
    };

    // Sort by Deadline
    const sortByDeadline = () => {
        const tasksWithDeadline = [...userTasks].filter((task) => task.deadline);
        const tasksWithoutDeadline = [...userTasks].filter((task) => !task.deadline);

        // Sort tasks with deadlines in ascending order
        tasksWithDeadline.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

        setUserTasks([...tasksWithDeadline, ...tasksWithoutDeadline]); // Append tasks without deadlines at the end
        setIsSorted(true); // Indicate that tasks are sorted
    };

    // Unsort and return to default format
    const unsortTasks = () => {
        setUserTasks(sortByDefault(userTasks)); // Reset to default sorting
        setIsSorted(false); // Indicate that tasks are unsorted
    };

    // Handle editing tasks
    const handleEditTask = (updatedTask) => {
        dispatch(editTask({ categoryName: updatedTask.categoryName, taskId: updatedTask.id, updatedTask }));
        setIsEditModalVisible(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#4B225F', padding: 16 }}>
            <ScrollView>
                {userTasks.length > 0 ? (
                    userTasks.map((task) => (
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
                    onClose={() => setIsEditModalVisible(false)}
                    onSave={handleEditTask}
                />
            )}
        </View>
    );
};

export default ShowAllTasks;
