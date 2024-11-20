import React, { useContext, useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { TaskBoardContext } from '../../../Context'

const AddCategoryModal = () => {
    const { isAddCategoryModalVisible, setIsAddCategoryModalVisible, categories, setCategories } = useContext(TaskBoardContext);
    const [categoryName, setCategoryName] = useState('');

    const handleAddCategory = () => {
        if (categoryName.trim()) {
            setCategories([...categories, { name: categoryName, tasks: [] }]);
            setCategoryName('');
            setIsAddCategoryModalVisible(false);
        }
    };

    return (
        <Modal
            visible={isAddCategoryModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setIsAddCategoryModalVisible(false)}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Add New Category</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Category Name"
                        placeholderTextColor="#AAAAAA"
                        value={categoryName}
                        onChangeText={setCategoryName}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Cancel"
                            color="#FF6F61"
                            onPress={() => setIsAddCategoryModalVisible(false)}
                        />
                        <Button
                            title="Add"
                            color="#A0D8B3"
                            onPress={handleAddCategory}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#4B225F',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#A0D8B3',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        color: '#FFFFFF',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default AddCategoryModal;
