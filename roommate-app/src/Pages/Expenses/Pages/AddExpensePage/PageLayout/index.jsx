import React from 'react';
import {View, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native';

const Layout = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex-1 p-4">{children}</View>
    </TouchableWithoutFeedback>
);

Layout.Field = ({ children }) => (
    <View className="mb-4">{children}</View> // Wrap each field for consistent spacing
);

Layout.ModalContainer = ({ visible, onClose, children }) => (
    <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <TouchableWithoutFeedback onPress={onClose}>
            <View className="flex-1 justify-center items-center bg-black/50">
                <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
);

export default Layout;
