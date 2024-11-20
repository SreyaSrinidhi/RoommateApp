import React, { useContext } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { TaskBoardContext } from '../../Context';

const TaskCategoryPage = ({ route, navigation }) => {
    const { category } = route.params;
    const { categories, setCategories } = useContext(TaskBoardContext);

    const handleDeleteCategory = () => {
        const updatedCategories = categories.filter((cat) => cat.name !== category.name);
        setCategories(updatedCategories);
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#4B225F', padding: 16 }}>
            <ScrollView>
                {category.tasks?.length > 0 ? (
                    category.tasks.map((task) => (
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
                        No tasks in this category.
                    </Text>
                )}
            </ScrollView>
            <Button
                title="Delete Category"
                color="#FF6F61"
                onPress={handleDeleteCategory}
            />
        </View>
    );
};

export default TaskCategoryPage;
