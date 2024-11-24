import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { editTask } from '../../../../../StateManagement/Slices/TaskBoardSlice'; // Adjust path

const EditTaskModal = ({ visible, onClose, task, category }) => {
    const [editedTask, setEditedTask] = useState(null);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isPickerVisible, setPickerVisible] = useState(false);

    const dispatch = useDispatch();

    // Sync `editedTask` with the current task when the task changes
    useEffect(() => {
        setEditedTask(task);
    }, [task]);

    const handleSave = () => {
        if (!editedTask?.name?.trim()) {
            Alert.alert('Error', 'Task name cannot be empty!');
            return;
        }

        if (!category?.name) {
            Alert.alert('Error', 'Invalid category data!');
            return;
        }

        dispatch(editTask({ categoryName: category.name, taskId: editedTask.id, updatedTask: editedTask }));
        onClose();
    };

    const toggleStatus = () => {
        const newStatus = editedTask.status === 'done' ? 'pending' : 'done';
        setEditedTask({ ...editedTask, status: newStatus });
    };

    const handleDateConfirm = (selectedDate) => {
        const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000)
            .toISOString()
            .split('T')[0]; // Format as 'YYYY-MM-DD'

        setEditedTask({
            ...editedTask,
            deadline: localDate,
        });
        setDatePickerVisible(false);
    };


    if (!editedTask) {
        return null; // Prevent rendering if no task is selected
    }

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ width: '90%', backgroundColor: '#EDEFF7', padding: 20, borderRadius: 12 }}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
                        <Ionicons name="close" size={24} color="#4B225F" />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4B225F', marginBottom: 20 }}>
                        Edit/View Task
                    </Text>

                    {/* Task Name Input */}
                    <Text style={{ marginBottom: 5, fontWeight: 'bold', color: '#4B225F' }}>Task Name:</Text>
                    <TextInput
                        placeholder="Enter Task Name"
                        value={editedTask.name}
                        onChangeText={(text) => setEditedTask({ ...editedTask, name: text })}
                        style={{
                            borderWidth: 1,
                            borderColor: '#4B225F',
                            borderRadius: 8,
                            padding: 10,
                            marginBottom: 16,
                            backgroundColor: '#FFFFFF',
                        }}
                    />

                    {/* Task Description Input */}
                    <Text style={{ marginBottom: 5, fontWeight: 'bold', color: '#4B225F' }}>Task Description:</Text>
                    <TextInput
                        placeholder="Enter Task Description"
                        value={editedTask.description}
                        onChangeText={(text) => setEditedTask({ ...editedTask, description: text })}
                        style={{
                            borderWidth: 1,
                            borderColor: '#4B225F',
                            borderRadius: 8,
                            padding: 10,
                            marginBottom: 16,
                            backgroundColor: '#FFFFFF',
                        }}
                        multiline
                    />

                    {/* Deadline Picker */}
                    <Text style={{ marginBottom: 5, fontWeight: 'bold', color: '#4B225F' }}>Deadline:</Text>
                    <TouchableOpacity
                        onPress={() => setDatePickerVisible(true)}
                        style={{
                            borderWidth: 1,
                            borderColor: '#4B225F',
                            borderRadius: 8,
                            padding: 10,
                            marginBottom: 16,
                            backgroundColor: '#FFFFFF',
                        }}
                    >
                        <Text style={{ color: '#4B225F' }}>
                            {editedTask.deadline || 'Select Deadline'}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={() => setDatePickerVisible(false)}
                    />

                    {/* Assign To Dropdown */}
                    <Text style={{ marginBottom: 5, fontWeight: 'bold', color: '#4B225F' }}>Assign To:</Text>
                    <TouchableOpacity
                        onPress={() => setPickerVisible(true)}
                        style={{
                            borderWidth: 1,
                            borderColor: '#4B225F',
                            borderRadius: 8,
                            padding: 10,
                            marginBottom: 16,
                            backgroundColor: '#FFFFFF',
                        }}
                    >
                        <Text style={{ color: '#4B225F' }}>
                            {editedTask.assignedTo || 'Select Assignee'}
                        </Text>
                    </TouchableOpacity>

                    {isPickerVisible && (
                        <Modal
                            transparent
                            animationType="fade"
                            onRequestClose={() => setPickerVisible(false)}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                <View
                                    style={{
                                        width: '80%',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: 12,
                                        padding: 20,
                                    }}
                                >
                                    <Picker
                                        selectedValue={editedTask.assignedTo}
                                        onValueChange={(value) => {
                                            setEditedTask({ ...editedTask, assignedTo: value });
                                            setPickerVisible(false);
                                        }}
                                    >
                                        <Picker.Item label="Unassigned" value="" />
                                        <Picker.Item label="You" value="You" />
                                        <Picker.Item label="Teammate 1" value="Teammate 1" />
                                        <Picker.Item label="Teammate 2" value="Teammate 2" />
                                    </Picker>
                                    <TouchableOpacity
                                        onPress={() => setPickerVisible(false)}
                                        style={{
                                            marginTop: 10,
                                            padding: 10,
                                            backgroundColor: '#8A7191',
                                            borderRadius: 8,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                                            Close
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    )}

                    {/* Toggle Status */}
                    <TouchableOpacity
                        onPress={toggleStatus}
                        style={{
                            backgroundColor: editedTask.status === 'done' ? '#A0D8B3' : '#8CC49F',
                            padding: 16,
                            borderRadius: 8,
                            alignItems: 'center',
                            marginBottom: 8,
                        }}
                    >
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                            {editedTask.status === 'done' ? 'Mark as Undone' : 'Mark as Done'}
                        </Text>
                    </TouchableOpacity>

                    {/* Save Button */}
                    <TouchableOpacity
                        onPress={handleSave}
                        style={{
                            backgroundColor: '#8A7191',
                            padding: 16,
                            borderRadius: 8,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default EditTaskModal;
