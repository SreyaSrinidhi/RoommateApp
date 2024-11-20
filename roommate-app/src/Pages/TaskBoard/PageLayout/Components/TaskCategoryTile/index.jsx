import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const TaskCategoryTile = ({ category, onPress }) => {
    return (
        <TouchableOpacity style={styles.tile} onPress={onPress}>
            <Text style={styles.text}>{category.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tile: {
        backgroundColor: '#A0D8B3',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default TaskCategoryTile;
