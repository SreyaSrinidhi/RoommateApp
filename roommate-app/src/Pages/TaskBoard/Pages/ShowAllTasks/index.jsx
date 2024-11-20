import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TaskBoardContext } from '../../Context';

const ShowAllTasks = () => {
    const { categories } = useContext(TaskBoardContext);

    return (
        <View style={{ flex: 1, backgroundColor: '#4B225F', padding: 16 }}>
            <ScrollView>
                {categories.flatMap((category) => category.tasks).length > 0 ? (
                    categories.flatMap((category) => category.tasks).map((task) => (
                        <View
                            key={task.id}
                            style={{
                                backgroundColor: '#A0D8B3',
                                padding: 16,
                                marginBottom: 8,
                                borderRadius: 8,
                            }}
                        >
                            <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                                {task.title}
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: '#FFFFFF' }}>
                        No tasks found.
                    </Text>
                )}
            </ScrollView>
        </View>
    );
};

export default ShowAllTasks;
