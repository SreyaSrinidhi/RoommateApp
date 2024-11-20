import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TaskBoardContext } from '../../Context';

const ShowAllTasks = () => {
    const { allTasks } = useContext(TaskBoardContext); // Access all tasks from context

    // Filter tasks assigned to the current user
    const userTasks = allTasks.filter((task) => task.assignedTo === 'you');

    return (
        <View style={{ flex: 1, backgroundColor: '#4B225F', padding: 16 }}>
            <ScrollView>
                {userTasks.length > 0 ? (
                    userTasks.map((task) => (
                        <View
                            key={task.id}
                            style={{
                                backgroundColor: '#EDEFF7',
                                padding: 16,
                                marginBottom: 8,
                                borderRadius: 16,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 2,
                            }}
                        >
                            <Text style={{ color: '#4B225F', fontWeight: 'bold', fontSize: 16 }}>
                                {task.name}
                            </Text>
                            <Text style={{ color: '#4B225F', fontSize: 14 }}>
                                Category: {task.categoryName}
                            </Text>
                            <Text style={{ color: '#4B225F', fontSize: 14 }}>
                                Deadline: {task.deadline || 'No deadline'}
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: '#FFFFFF' }}>
                        No tasks assigned to you.
                    </Text>
                )}
            </ScrollView>
        </View>
    );
};

export default ShowAllTasks;
