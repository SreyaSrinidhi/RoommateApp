import React, { useState, useContext } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { TaskBoardContext } from '../../../Context';
import { AntDesign } from '@expo/vector-icons';

const AddCategoryModal = () => {
    const { isAddCategoryModalVisible, setIsAddCategoryModalVisible, categories, setCategories } =
        useContext(TaskBoardContext);
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAddCategory = () => {
        if (newCategoryName.trim()) {
            setCategories([...categories, { name: newCategoryName, tasks: [] }]);
            setNewCategoryName('');
            setIsAddCategoryModalVisible(false);
        }
    };

    const handleClose = () => {
        setNewCategoryName('');
        setIsAddCategoryModalVisible(false);
    };

    return (
        <Modal
            visible={isAddCategoryModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={handleClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Add New Category</Text>
                        <TouchableOpacity onPress={handleClose}>
                            <AntDesign name="close" size={24} color="#4B225F" />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter category name"
                        placeholderTextColor="#4B225F" // Dark purple placeholder text
                        value={newCategoryName}
                        onChangeText={setNewCategoryName}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
                        <Text style={styles.addButtonText}>Add Category</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#FFFFFF', // White modal
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4B225F', // Dark purple text
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: '#4B225F', // Dark purple border
        borderWidth: 1,
        marginBottom: 20,
        color: '#4B225F', // Dark purple text
    },
    addButton: {
        backgroundColor: '#A0D8B3', // Mint green
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AddCategoryModal;
