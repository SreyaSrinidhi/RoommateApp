import { Text, TouchableOpacity, View, Button, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { CalendarContext } from "../../../Context";
import { useDispatch, useSelector } from "react-redux";

const Task = () => {
    const { tasks } = useSelector((state) => state.calendar);
    const { selectedDate, setSelectedTask } = useContext(CalendarContext);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const handleDelete = (taskId) => {
        dispatch({
            type: "calendar/deleteTask",
            payload: { date: selectedDate, taskId },
        });
    };

    const handleEdit = (taskId) => {
        if (editTitle.trim() === "") return;

        dispatch({
            type: "calendar/editTask",
            payload: {
                date: selectedDate,
                taskId,
                updatedTask: { title: editTitle },
            },
        });

        setIsEditing(null); // Close the edit mode
        setEditTitle(""); // Clear the input
    };

    return (
        <>
            {tasks[selectedDate] ? (
                tasks[selectedDate].map((task, index) => (
                    <View
                        key={task.id || index}
                        testID={`task-${task.id || index}`} // Use `id` or fallback to `index`
                        className="mt-4 bg-[#2BAC76] p-4 rounded-lg"
                    >
                        {isEditing === task.id ? (
                            <View>
                                <TextInput
                                    testID="edit-task-title"
                                    value={editTitle}
                                    placeholder="Edit Title"
                                    onChangeText={setEditTitle}
                                    className="border p-2 rounded"
                                />
                                <Button
                                    title="Save"
                                    onPress={() => handleEdit(task.id)}
                                    testID="save-task"
                                    color="#4CAF50"
                                />
                            </View>
                        ) : (
                            <TouchableOpacity onPress={() => setSelectedTask(task)}>
                                <Text className="font-bold text-2xl text-[#4A154B]">{task.title}</Text>
                                <Text className="text-xs text-[#4A154B]">
                                    {`${task.created || "Unknown"} | ${task.subtitle || ""} | ${task.due || ""}`}
                                </Text>
                            </TouchableOpacity>
                        )}

                        <Button
                            testID={`delete-task-${task.id || index}`} // Add testID for the delete button
                            title="Delete"
                            color="#FF4A4A"
                            onPress={() => handleDelete(task.id || index)}
                        />
                        <Button
                            title="Edit"
                            onPress={() => {
                                setIsEditing(task.id);
                                setEditTitle(task.title); // Pre-fill the input with the current title
                            }}
                            testID={`edit-task-${task.id || index}`} // Add testID for the edit button
                            color="#2196F3"
                        />
                    </View>
                ))
            ) : (
                <View className="mt-4 bg-[#2BAC76] p-4 rounded-lg">
                    <Text className="text-[#4A154B]">No tasks for the selected date.</Text>
                </View>
            )}
        </>
    );
};

export default Task;
