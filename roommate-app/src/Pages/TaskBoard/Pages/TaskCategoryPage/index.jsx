import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { TaskBoardContext } from '../../Context';
import AddTaskModal from './../../PageLayout/Components/AddTaskModal';
import EditTaskModal from './../../PageLayout/Components/EditTaskModal';

const TaskCategoryPage = ({ route }) => {
    const { category: initialCategory } = route.params;
    const { categories } = useContext(TaskBoardContext);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(initialCategory);

    // Dynamically update currentCategory when categories change
    useEffect(() => {
        const updatedCategory = categories.find((cat) => cat.name === initialCategory.name);
        if (updatedCategory) {
            setCurrentCategory(updatedCategory);
        }
    }, [categories]); // Dependency array ensures this runs whenever categories are updated

    return (
        <View style={{ flex: 1, backgroundColor: '#4B225F', padding: 16 }}>
            <ScrollView>
                {currentCategory?.tasks?.length > 0 ? (
                    currentCategory.tasks.map((task) => (
                        <TouchableOpacity
                            key={task.id}
                            style={{
                                backgroundColor: task.status === 'done' ? '#A0D8B3' : '#EDEFF7', // Mint green if done
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
                    onClose={() => {
                        setSelectedTask(null);
                        setIsEditModalVisible(false);
                    }}
                />
            )}
        </View>
    );
};

export default TaskCategoryPage;
