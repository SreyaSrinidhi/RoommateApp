import React, { useContext, useState } from 'react';
import { Text, Button, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask } from '../../../../../StateManagement/Slices/CalendarSlice';
import { CalendarContext } from '../../../Context';

const CalenderEventModal = () => {
    const { selectedTask: task, selectedDate, setSelectedTask: setTask } = useContext(CalendarContext);
    const dispatch = useDispatch();

    // Ensure task is defined and provide default values
    const safeTask = task || { title: '', description: '', due: '', id: null };

    // State for editing task
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(safeTask.title);
    const [editedDescription, setEditedDescription] = useState(safeTask.description);
    const [editedDue, setEditedDue] = useState(safeTask.due);

    const closeModal = () => {
        setTask(null);
    };

    // Handle updating the task
    const handleEdit = () => {
        const updatedTask = {
            title: editedTitle,
            description: editedDescription,
            due: editedDue,
        };
        dispatch(editTask({ date: selectedDate, taskId: safeTask.id, updatedTask }));
        setIsEditing(false);
        closeModal();
        // Stop editing mode
    };

    // Handle deleting the task
    const handleDelete = () => {
        dispatch(deleteTask({ date: selectedDate, taskId: safeTask.id }));
        closeModal();
        // Close modal after deleting
    };

    return (
        <>
            {isEditing ? (
                <>
                    <Text className="text-xl font-bold mb-4">Edit Event</Text>

                    <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Title</Text>
                    <TextInput
                        value={editedTitle}
                        onChangeText={setEditedTitle}
                        className="border border-gray-300 p-2 mb-4 w-full"
                    />

                    <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Description</Text>
                    <TextInput
                        value={editedDescription}
                        onChangeText={setEditedDescription}
                        className="border border-gray-300 p-2 mb-4 w-full"
                    />

                    <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Due Time</Text>
                    <TextInput
                        value={editedDue}
                        onChangeText={setEditedDue}
                        className="border border-gray-300 p-2 mb-4 w-full"
                    />
                    <Button title="Save" onPress={handleEdit} />
                    <Button title="Cancel" onPress={() => setIsEditing(false)} />
                </>
            ) : (
                <>
                    <Text className="text-[#4A154B] text-xl font-bold mb-4">{safeTask.title}</Text>
                    <Text className="text-[#4A154B] mb-2">{safeTask.description}</Text>
                    <Text className="text-[#4A154B] mb-4">{safeTask.due}</Text>
                    <Button title="Edit" onPress={() => setIsEditing(true)} />
                    <Button title="Delete" onPress={handleDelete} />
                </>
            )}
        </>
    );
};

export default CalenderEventModal;
