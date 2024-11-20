import React, { useState, useContext } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TaskBoardContext } from '../../../Context';

const AddTaskModal = ({ visible, onClose, category }) => {
    const [taskName, setTaskName] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [deadline, setDeadline] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
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
            assignedTo: assignedTo || 'Unassigned',
            deadline: deadline || 'No deadline',
        };

        const updatedCategories = categories.map((cat) =>
            cat.name === category.name
                ? {
                    ...cat,
                    tasks: [...cat.tasks, newTask],
                }
                : cat
        );

        setCategories(updatedCategories);
        setTaskName('');
        setAssignedTo('');
        setDeadline('');
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ width: '90%', backgroundColor: '#EDEFF7', padding: 20, borderRadius: 12 }}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
                        <Ionicons name="close" size={24} color="#4A154B" />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4B225F', marginBottom: 20 }}>
                        Add Task
                    </Text>

                    {/* Task Name Input */}
                    <Text style={{ marginBottom: 5, fontWeight: 'bold', color: '#4B225F' }}>Task Name:</Text>
                    <TextInput
                        placeholder="Enter task name"
                        value={taskName}
                        onChangeText={setTaskName}
                        style={{
                            borderWidth: 1,
                            borderColor: '#4B225F',
                            borderRadius: 8,
                            padding: 10,
                            marginBottom: 16,
                            backgroundColor: '#FFFFFF',
                        }}
                    />

                    {/* Assigned To Dropdown */}
                    <Text style={{ marginBottom: 5, fontWeight: 'bold', color: '#4B225F' }}>Assign To:</Text>
                    <Picker
                        selectedValue={assignedTo}
                        onValueChange={(value) => setAssignedTo(value)}
                        style={{
                            width: '100%',
                            borderWidth: 1,
                            borderColor: '#4B225F',
                            backgroundColor: '#FFFFFF',
                            marginBottom: 16,
                        }}
                    >
                        <Picker.Item label="Unassigned" value="Unassigned" />
                        <Picker.Item label="You" value="You" />
                        <Picker.Item label="Teammate 1" value="Teammate 1" />
                        <Picker.Item label="Teammate 2" value="Teammate 2" />
                    </Picker>

                    {/* Deadline Date Picker */}
                    <Text style={{ marginBottom: 5, fontWeight: 'bold', color: '#4B225F' }}>Deadline:</Text>
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
                            {deadline || 'Select Deadline'}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={deadline ? new Date(deadline) : new Date()}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) {
                                    setDeadline(selectedDate.toISOString().split('T')[0]);
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
                        }}
                    >
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AddTaskModal;
