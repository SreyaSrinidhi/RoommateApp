import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory } from '../../../StateManagement/Slices/TaskBoardSlice'; // Adjust the path as necessary
import AddCategoryModal from './Components/AddCategoryModal';

const TaskBoardPage = () => {
    const categories = useSelector((state) => state.taskBoard.categories); // Fetch categories from Redux
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = React.useState(false); // Local state for modal visibility

    const handleAddCategory = (newCategoryName) => {
        if (newCategoryName.trim()) {
            dispatch(addCategory({ categoryName: newCategoryName })); // Dispatch Redux action to add a category
        } else {
            alert('Category name cannot be empty!');
        }
        setIsAddCategoryModalVisible(false); // Close the modal after adding
    };

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
            {/* Add Category Modal */}
            <AddCategoryModal
                visible={isAddCategoryModalVisible}
                onClose={() => setIsAddCategoryModalVisible(false)}
                onAddCategory={handleAddCategory} // Pass the handler to the modal
            />
        </View>
    );
};

export default TaskBoardPage;
