import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { editTask } from '../../../../StateManagement/Slices/TaskBoardSlice';
import AddTaskModal from './../../PageLayout/Components/AddTaskModal';
import EditTaskModal from './../../PageLayout/Components/EditTaskModal';

const TaskCategoryPage = ({ route }) => {
    const { category: initialCategory } = route.params;
    const categories = useSelector((state) => state.taskBoard.categories);
    const dispatch = useDispatch();

    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(initialCategory);
    const [sortedTasks, setSortedTasks] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    // Dynamically update `currentCategory` and tasks when categories change
    useEffect(() => {
        const updatedCategory = categories.find((cat) => cat.name === initialCategory.name);
        if (updatedCategory) {
            setCurrentCategory(updatedCategory);
            setSortedTasks(sortByDefault(updatedCategory.tasks)); // Sort tasks by default
        }
    }, [categories]);

    // Default sorting: Pending first, then Done
    const sortByDefault = (tasks) => {
        const pendingTasks = tasks.filter((task) => task.status !== 'done');
        const doneTasks = tasks.filter((task) => task.status === 'done');
        return [...pendingTasks, ...doneTasks];
    };

    // Sort by Deadline
    const sortByDeadline = () => {
        const tasksWithDeadline = [...sortedTasks].filter((task) => task.deadline);
        const tasksWithoutDeadline = [...sortedTasks].filter((task) => !task.deadline);

        // Sort tasks with deadlines in ascending order
        tasksWithDeadline.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

        setSortedTasks([...tasksWithDeadline, ...tasksWithoutDeadline]); // Append tasks without deadlines
        setIsSorted(true);
    };

    // Reset to default sorting
    const unsortTasks = () => {
        setSortedTasks(sortByDefault(currentCategory.tasks)); // Reset to default order
        setIsSorted(false);
    };

    // Handle task editing
    const handleEditTask = (updatedTask) => {
        dispatch(editTask({ categoryName: currentCategory.name, taskId: updatedTask.id, updatedTask }));
        setIsEditModalVisible(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#4B225F', padding: 16 }}>
            <ScrollView>
                {sortedTasks?.length > 0 ? (
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
                                setSelectedTask(task); // Set the correct task
                                setIsEditModalVisible(true);
                            }}
                        >
                            <View>
                                <Text style={{ color: '#4B225F', fontWeight: 'bold', fontSize: 16 }}>
                                    {task.name || 'Untitled Task'}
                                </Text>
                                <Text style={{ color: '#4B225F', fontSize: 14 }}>
                                    Assigned to: {task.assignedTo || 'Unassigned'}
                                </Text>
                                <Text style={{ color: '#4B225F', fontSize: 14 }}>
                                    Deadline: {task.deadline || 'No deadline'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: '#FFFFFF' }}>
                        No tasks in this category.
                    </Text>
                )}
            </ScrollView>

            {/* Sort/Unsort Button */}
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

            {/* Add Task Button */}
            <TouchableOpacity
                onPress={() => setIsAddModalVisible(true)}
                style={{
                    backgroundColor: '#8CC49F',
                    padding: 16,
                    borderRadius: 16,
                    alignItems: 'center',
                    marginTop: 16,
                }}
            >
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }}>Add Task</Text>
            </TouchableOpacity>

            {/* Add Task Modal */}
            <AddTaskModal
                visible={isAddModalVisible}
                category={currentCategory}
                onClose={() => setIsAddModalVisible(false)}
            />

            {/* Edit Task Modal */}
            {selectedTask && (
                <EditTaskModal
                    visible={isEditModalVisible}
                    task={selectedTask}
                    category={currentCategory}
                    onClose={() => setIsEditModalVisible(false)}
                    onSave={handleEditTask}
                />
            )}
        </View>
    );
};

export default TaskCategoryPage;
