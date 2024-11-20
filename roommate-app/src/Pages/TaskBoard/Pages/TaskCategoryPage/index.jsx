import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { TaskBoardContext } from '../../Context';
import AddTaskModal from './../../PageLayout/Components/AddTaskModal';
import EditTaskModal from './../../PageLayout/Components/EditTaskModal';

const TaskCategoryPage = ({ route }) => {
    const { category } = route.params;
    const { categories } = useContext(TaskBoardContext);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(category);

    // Sync tasks dynamically when `categories` updates
    useEffect(() => {
        const updatedCategory = categories.find(
            (cat) => cat.name === category.name
        );
        if (updatedCategory) {
            setCurrentCategory(updatedCategory);
        }
    }, [categories]);

    return (
        <View style={{ flex: 1, backgroundColor: '#4B225F', padding: 16 }}>
            <ScrollView>
                {currentCategory.tasks?.length > 0 ? (
                    currentCategory.tasks.map((task) => (
                        <TouchableOpacity
                            key={task.id}
                            style={{
                                backgroundColor: '#EDEFF7',
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
                                    {task.name}
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

            <AddTaskModal
                visible={isAddModalVisible}
                category={currentCategory}
                onClose={() => setIsAddModalVisible(false)}
            />

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
