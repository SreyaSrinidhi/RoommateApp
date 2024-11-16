import { useEffect, useContext, useState } from 'react'    
import { Text, TextInput, Button, Modal, TouchableWithoutFeedback, View, Alert, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { editEmergencyButton, deleteEmergencyButton } from '../../../../StateManagement/Slices/EmergencyButtonSlice'
import { EmergencyContext } from '../../Context';

export default function EmergencyButtonModal() {
    const { selectedButton, setSelectedButton } = useContext(EmergencyContext);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedMessage, setEditedMessage] = useState('');
    const [editedBgColor, setEditedBgColor] = useState('');

    // only attempt setting title, message, and bgColor if there is a selected button
    useEffect(() => {
        if (selectedButton) {
            setEditedTitle(selectedButton.title || '');
            setEditedMessage(selectedButton.message || '');
            setEditedBgColor(selectedButton.bgColor || '');
        }
    }, [selectedButton]);

    const closeModal = () => {
        setSelectedButton(null);
        setIsEditing(false);
    }

    // Handle updating the button
    const handleEdit = () => {
        //only submit edit if data was set to valid inputs
        if (editedTitle.trim() !== '' && editedMessage.trim() !== '') {
            dispatch(editEmergencyButton({ buttonId: selectedButton.id, title: editedTitle, message: editedMessage, bgColor: editedBgColor }));
            setIsEditing(false);
            closeModal()
        }
        //if inputs were invalid
        else {
            Alert.alert('Error', 'Title and description must not be empty.');
        }
    };

    //Handle sending notification
    const handleNotification = () => {
        Alert.alert(`Emergency button ${selectedButton.title} pressed with message: ${selectedButton.message}`)
        closeModal();
    }

    // Handle deleting the task
    const handleDelete = () => {
        dispatch(deleteEmergencyButton({ buttonId: selectedButton.id }));
        closeModal()
    };

    if (!selectedButton) {
        return null
    }

    return (
        // visible={!!selectedButton}  makes this only visible when there is a selected button
        <Modal
            animationType="fade"
            transparent={true}
            visible={!!selectedButton}  
            onRequestClose={closeModal}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View className="flex-1 justify-center items-center bg-black/50">
                    <TouchableWithoutFeedback>
                        <View className="w-72 p-6 bg-[#EDEFF7] rounded-xl items-center">
                            

                        {isEditing ? (
                            <>
                                <Text className="text-xl font-bold mb-4">Edit Emergency Button</Text>

                                <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Title</Text>
                                <TextInput
                                    value={editedTitle}
                                    placeholder='Enter title here'
                                    onChangeText={setEditedTitle}
                                    className="border border-gray-300 p-2 mb-4 w-full"
                                />
                                
                                <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Message</Text>
                                <TextInput
                                    value={editedMessage}
                                    placeholder='Enter message here'
                                    onChangeText={setEditedMessage}
                                    className="border border-gray-300 p-2 mb-4 w-full"
                                />

                                <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Background Color</Text>
                                <TextInput
                                    value={editedBgColor}
                                    placeholder='Enter color here'
                                    onChangeText={setEditedBgColor}
                                    className="border border-gray-300 p-2 mb-4 w-full"
                                />
                                <Pressable
                                    className="bg-[#8CC49F] rounded-md p-4 mb-3 w-full"
                                    onPress={handleEdit}
                                >
                                    <Text className="text-white font-bold text-center">Save</Text>
                                </Pressable>
                                <Pressable
                                    className="bg-[#8CC49F] rounded-md p-4 mb-3 w-full"
                                    onPress={() => setIsEditing(false)}
                                >
                                    <Text className="text-white font-bold text-center">Cancel</Text>
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <Text className="text-[#4A154B] text-xl font-bold mb-2">{selectedButton.title}</Text>
                                <Text className="text-[#4A154B] mb-4 text-center">{`Notification Message: \n${selectedButton.message}`}</Text>
                                <Pressable
                                    className="bg-[#8A7191] rounded-md p-4 mb-3 w-full"
                                    onPress={handleNotification}
                                >
                                    <Text className="text-white font-bold text-center">Send Emergency Notification</Text>
                                </Pressable>

                                {/*only render edit and delete buttons if button isn/t marked as permanent*/}
                                {!selectedButton.isPermanent ? (
                                    <>
                                        <Pressable
                                            onPress={() => setIsEditing(true)}
                                            className="bg-[#8CC49F] rounded-md p-4 mb-3 w-full"
                                        >
                                            <Text className="text-white font-bold text-center">Edit</Text>
                                        </Pressable>

                                        <Pressable
                                            onPress={handleDelete}
                                            className="bg-red-500 rounded-md p-4 mb-3 w-full"
                                        >
                                            <Text className="text-white font-bold text-center">Delete</Text>
                                        </Pressable>
                                    </>
                                ) : null }
                            </>
                        )}


                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}