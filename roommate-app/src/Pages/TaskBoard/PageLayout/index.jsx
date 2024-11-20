import React, { useContext } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TaskBoardContext } from '../Context';
import AddCategoryModal from './Components/AddCategoryModal';

const TaskBoardPage = () => {
    const { categories, setIsAddCategoryModalVisible } = useContext(TaskBoardContext);
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: '#4B225F', padding: 16 }}>
            <ScrollView>
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                backgroundColor: '#A0D8B3',
                                padding: 16,
                                marginBottom: 8,
                                borderRadius: 8,
                            }}
                            onPress={() =>
                                navigation.navigate('TaskCategoryPage', { category })
                            }
                        >
                            <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: '#FFFFFF' }}>
                        No categories found. Add a new one!
                    </Text>
                )}
            </ScrollView>
            <Button
                title="Show My Tasks"
                color="#A0D8B3"
                onPress={() => navigation.navigate('ShowAllTasks')}
            />
            <Button
                title="Add Category"
                color="#A0D8B3"
                onPress={() => setIsAddCategoryModalVisible(true)}
            />
            <AddCategoryModal />
        </View>
    );
};

export default TaskBoardPage;
