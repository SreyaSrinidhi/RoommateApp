import {Text, TouchableOpacity, View} from "react-native";
import React, {useContext} from "react";
import {CalendarContext} from "../../../Context";
import {useSelector} from "react-redux";


const Task = ()=>{
    const {tasks} = useSelector(state => state.calendar);

    const {selectedDate, setSelectedTask} = useContext(CalendarContext);

    return(
        <>
            {tasks[selectedDate] ? (
                tasks[selectedDate].map((task, index) => (
                    <TouchableOpacity key={index} className="mt-4 bg-[#2BAC76] p-4 rounded-lg"
                                      onPress={() => setSelectedTask(task)} // Open the modal when a task is pressed
                    >
                        <Text className="font-bold text-2xl text-[#4A154B]">{task.title}</Text>
                        <Text className="text-xs text-[#4A154B]">{`${task.created}| ${task.subtitle} | ${task.due}`}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <View className="mt-4 bg-[#2BAC76] p-4 rounded-lg">
                    <Text className="text-[#4A154B]">No tasks for the selected date.</Text>
                </View>
            )}
        </>
    )
}

export default Task;