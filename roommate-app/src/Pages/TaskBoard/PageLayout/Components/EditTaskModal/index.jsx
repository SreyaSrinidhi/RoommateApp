import React, { useState, useContext } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { TaskBoardContext } from '../../../Context';
import { Ionicons } from '@expo/vector-icons';

const EditTaskModal = ({ visible, onClose, task, category }) => {
    const [editedTask, setEditedTask] = useState({ ...task });
    const { categories, setCategories } = useContext(TaskBoardContext);

    const handleSave = () => {
        if (!editedTask.name.trim()) {
            Alert.alert('Error', 'Task name cannot be empty!');
            return;
        }

        if (!category || !category.name) {
            Alert.alert('Error', 'Invalid category data!');
            return;
        }

        const updatedCategories = categories.map((cat) =>
            cat.name === category.name
                ? {
                    ...cat,
                    tasks: cat.tasks.map((t) =>
                        t.id === editedTask.id ? editedTask : t
                    ),
                }
                : cat
        );

        setCategories([...updatedCategories]);
        onClose();
    };

    const handleDelete = () => {
        if (!category || !category.name) {
            Alert.alert('Error', 'Invalid category data!');
            return;
        }

        const updatedCategories = categories.map((cat) =>
            cat.name === category.name
                ? {
                    ...cat,
                    tasks: cat.tasks.filter((t) => t.id !== editedTask.id),
                }
                : cat
        );

        setCategories([...updatedCategories]);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-4/5 bg-[#EDEFF7] p-6 rounded-xl items-center relative">
                    <TouchableOpacity onPress={onClose} className="absolute top-4 right-4">
                        <Ionicons name="close" size={24} color="#4A154B" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold mb-4">Edit Task</Text>
                    <TextInput
                        placeholder="Task Name"
                        value={editedTask.name}
                        onChangeText={(text) =>
                            setEditedTask({ ...editedTask, name: text })
                        }
                        className="border border-[#4B225F] rounded-md p-3 mb-4 w-full"
                    />
                    <TextInput
                        placeholder="Assigned To"
                        value={editedTask.assignedTo || ''}
                        onChangeText={(text) =>
                            setEditedTask({ ...editedTask, assignedTo: text })
                        }
                        className="border border-[#4B225F] rounded-md p-3 mb-4 w-full"
                    />
                    <TextInput
                        placeholder="Deadline"
                        value={editedTask.deadline || ''}
                        onChangeText={(text) =>
                            setEditedTask({ ...editedTask, deadline: text })
                        }
                        className="border border-[#4B225F] rounded-md p-3 mb-4 w-full"
                    />
                    <TouchableOpacity
                        onPress={handleSave}
                        className="bg-[#8CC49F] p-3 rounded-md w-full items-center mb-4"
                    >
                        <Text className="text-white font-bold">Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleDelete}
                        className="bg-[#FF6F61] p-3 rounded-md w-full items-center"
                    >
                        <Text className="text-white font-bold">Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default EditTaskModal;
