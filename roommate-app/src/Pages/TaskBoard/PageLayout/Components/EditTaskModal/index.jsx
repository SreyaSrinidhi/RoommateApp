import React, { useState, useContext } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TaskBoardContext } from '../../../Context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditTaskModal = ({ visible, onClose, task, category }) => {
    const [editedTask, setEditedTask] = useState({ ...task });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const { categories, setCategories } = useContext(TaskBoardContext);

    const handleSave = () => {
        if (!editedTask || !editedTask.name || !editedTask.name.trim()) {
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

        setCategories(updatedCategories);
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

        setCategories(updatedCategories);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-4/5 bg-[#EDEFF7] p-6 rounded-xl items-center relative">
                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} className="absolute top-4 right-4">
                        <Ionicons name="close" size={24} color="#4A154B" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold mb-4">Edit Task</Text>

                    {/* Task Name Input */}
                    <TextInput
                        placeholder="Task Name"
                        value={editedTask.name}
                        onChangeText={(text) =>
                            setEditedTask({ ...editedTask, name: text })
                        }
                        style={{
                            borderWidth: 1,
                            borderColor: '#4B225F',
                            borderRadius: 8,
                            padding: 10,
                            marginBottom: 16,
                            width: '100%',
                            backgroundColor: '#FFFFFF',
                        }}
                    />

                    {/* Assigned To Dropdown */}
                    <Text style={{ alignSelf: 'flex-start', marginBottom: 4, color: '#4B225F', fontWeight: 'bold' }}>
                        Assign To:
                    </Text>
                    <Picker
                        selectedValue={editedTask.assignedTo}
                        onValueChange={(value) =>
                            setEditedTask({ ...editedTask, assignedTo: value })
                        }
                        style={{
                            width: '100%',
                            borderWidth: 1,
                            borderColor: '#4B225F',
                            backgroundColor: '#FFFFFF',
                            marginBottom: 16,
                        }}
                    >
                        <Picker.Item label="Unassigned" value="" />
                        <Picker.Item label="You" value="You" />
                        <Picker.Item label="Teammate 1" value="Teammate 1" />
                        <Picker.Item label="Teammate 2" value="Teammate 2" />
                    </Picker>

                    {/* Deadline Date Picker */}
                    <Text style={{ alignSelf: 'flex-start', marginBottom: 4, color: '#4B225F', fontWeight: 'bold' }}>
                        Deadline:
                    </Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={{
                            borderWidth: 1,
                            borderColor: '#4B225F',
                            borderRadius: 8,
                            padding: 10,
                            width: '100%',
                            marginBottom: 16,
                            backgroundColor: '#FFFFFF',
                        }}
                    >
                        <Text style={{ color: '#4B225F' }}>
                            {editedTask.deadline || 'Select Deadline'}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={editedTask.deadline ? new Date(editedTask.deadline) : new Date()}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) {
                                    setEditedTask({
                                        ...editedTask,
                                        deadline: selectedDate.toISOString().split('T')[0],
                                    });
                                }
                            }}
                        />
                    )}

                    {/* Save Button */}
                    <TouchableOpacity
                        onPress={handleSave}
                        style={{
                            backgroundColor: '#8CC49F',
                            padding: 16,
                            borderRadius: 8,
                            alignItems: 'center',
                            marginBottom: 8,
                            width: '100%',
                        }}
                    >
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Save</Text>
                    </TouchableOpacity>

                    {/* Delete Button */}
                    <TouchableOpacity
                        onPress={handleDelete}
                        style={{
                            backgroundColor: '#FF6F61',
                            padding: 16,
                            borderRadius: 8,
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default EditTaskModal;
