import React, { useState, useContext } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { TaskBoardContext } from '../../../Context';
import { Ionicons } from '@expo/vector-icons';

const AddTaskModal = ({ visible, onClose, category }) => {
    const [taskName, setTaskName] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [deadline, setDeadline] = useState('');
    const { categories, setCategories } = useContext(TaskBoardContext);

    const handleSave = () => {
        if (!taskName.trim()) {
            Alert.alert('Error', 'Task name cannot be empty!');
            return;
        }

        if (!category || !category.name) {
            Alert.alert('Error', 'Invalid category data!');
            return;
        }

        const newTask = {
            id: Date.now().toString(),
            name: taskName,
            assignedTo: assignedTo || null,
            deadline: deadline || null,
        };

        const updatedCategories = categories.map((cat) =>
            cat.name === category.name
                ? { ...cat, tasks: [...cat.tasks, newTask] }
                : cat
        );

        setCategories([...updatedCategories]);
        setTaskName('');
        setAssignedTo('');
        setDeadline('');
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-4/5 bg-[#EDEFF7] p-6 rounded-xl items-center relative">
                    <TouchableOpacity onPress={onClose} className="absolute top-4 right-4">
                        <Ionicons name="close" size={24} color="#4A154B" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold mb-4">Add Task</Text>
                    <TextInput
                        placeholder="Task Name"
                        value={taskName}
                        onChangeText={setTaskName}
                        className="border border-[#4B225F] rounded-md p-3 mb-4 w-full"
                    />
                    <TextInput
                        placeholder="Assigned To"
                        value={assignedTo}
                        onChangeText={setAssignedTo}
                        className="border border-[#4B225F] rounded-md p-3 mb-4 w-full"
                    />
                    <TextInput
                        placeholder="Deadline"
                        value={deadline}
                        onChangeText={setDeadline}
                        className="border border-[#4B225F] rounded-md p-3 mb-4 w-full"
                    />
                    <TouchableOpacity
                        onPress={handleSave}
                        className="bg-[#8CC49F] p-3 rounded-md w-full items-center"
                    >
                        <Text className="text-white font-bold">Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AddTaskModal;
