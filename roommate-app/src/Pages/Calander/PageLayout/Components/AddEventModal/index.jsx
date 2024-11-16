import React, { useState, useContext } from 'react';
import { Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { CalendarContext } from '../../../Context';
import { addTask } from '../../../../../StateManagement/Slices/CalendarSlice';
import uuid from 'react-native-uuid';

const AddEventModal = () => {
    const { selectedDate, setIsAddEventModalVisible } = useContext(CalendarContext); // Get selectedDate from the context
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due, setDue] = useState('');

    const handleSubmit = () => {
        const newEvent = {
            title,
            description,
            due,
        };

        // Dispatch the new task to Redux
        dispatch(addTask({ date: selectedDate, task: newEvent }));

        setIsAddEventModalVisible(false); // Close modal after submitting
    };

    return (
        <>
            <Text className="text-xl font-bold mb-4">Add Event</Text>

            <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                className="border border-gray-300 p-2 mb-4 w-full"
            />

            <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Description</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                className="border border-gray-300 p-2 mb-4 w-full"
            />

            <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Due Time</Text>
            <TextInput
                value={due}
                onChangeText={setDue}
                className="border border-gray-300 p-2 mb-4 w-full"
            />

            <Button title="Add" onPress={handleSubmit} />
        </>
    );
};

export default AddEventModal;