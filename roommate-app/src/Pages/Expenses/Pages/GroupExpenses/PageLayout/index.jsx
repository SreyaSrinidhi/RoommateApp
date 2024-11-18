// src/Pages/GroupScreen/PageLayout/Layout.js
import React from 'react';
import { View, Modal, TouchableWithoutFeedback, FlatList } from 'react-native';

const Layout = ({ children, ...restProps }) => {
    return (
            <View className="flex-1 bg-[#4A154B] p-4" {...restProps}>
                {children}
            </View>
    );
};

Layout.BalanceSection = ({ children, ...restProps }) => (
    <View className="mb-5" {...restProps}>
        {children}
    </View>
);

Layout.ScrollSection = ({ children, ...restProps }) => (
    <FlatList
        className="flex-1"
        ItemSeparatorComponent={() => <View className="h-3" />}
        {...restProps}
    >
        {children}
    </FlatList>
);

Layout.SettleExpenseModal = ({ visible, children, onClose }) => (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
            <View className="flex-1 justify-center items-center bg-black/50">
                <TouchableWithoutFeedback>
                    {children}
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
);

export default Layout;
