import React, { useState, useContext } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // New Date Picker
import { TaskBoardContext } from '../../../Context';
import { Picker } from '@react-native-picker/picker';

const EditTaskModal = ({ visible, onClose, task, category }) => {
    const [editedTask, setEditedTask] = useState({ ...task });
    const [isDatePickerVisible, setDatePickerVisible] = useState(false); // For the new date picker
    const [isPickerVisible, setPickerVisible] = useState(false); // For dropdown visibility
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

    const toggleStatus = () => {
        const newStatus = editedTask.status === 'done' ? 'pending' : 'done';
        setEditedTask({ ...editedTask, status: newStatus });
    };

    const handleDateConfirm = (selectedDate) => {
        setEditedTask({
            ...editedTask,
            deadline: selectedDate.toISOString().split('T')[0],
        });
        setDatePickerVisible(false);
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
                        Edit/View Task
                    </Text>

                    {/* Task Name Input */}
                    <Text style={{ marginBottom: 5, fontWeight: 'bold', color: '#4B225F' }}>Task Name:</Text>
                    <TextInput
                        placeholder="Enter Task Name"
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
                            backgroundColor: '#FFFFFF',
                        }}
                    />

                    {/* Task Description Input */}
                    <Text style={{ marginBottom: 5, fontWeight: 'bold', color: '#4B225F' }}>Task Description:</Text>
                    <TextInput
                        placeholder="Enter Task Description"
                        value={editedTask.description}
                        onChangeText={(text) =>
                            setEditedTask({ ...editedTask, description: text })
                        }
                        style={{
                            borderWidth: 1,
                            borderColor: '#4B225F',
                            borderRadius: 8,
                            padding: 10,
                            marginBottom: 16,
                            backgroundColor: '#FFFFFF',
                        }}
                        multiline
                        blurOnSubmit={true} // Fix for keyboard dismissal
                        onSubmitEditing={() => {}}
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

                    {/* Picker Modal */}
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

                    {/* Deadline Date Picker */}
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

                    {/* Toggle Status Button */}
                    <TouchableOpacity
                        onPress={toggleStatus}
                        style={{
                            backgroundColor: editedTask.status === 'done' ? '#A0D8B3' : '#8CC49F',
                            padding: 16,
                            borderRadius: 8,
                            alignItems: 'center',
                            marginBottom: 8,
                            width: '100%',
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
                            marginBottom: 8,
                            width: '100%',
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
