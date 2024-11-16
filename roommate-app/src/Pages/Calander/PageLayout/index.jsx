import React, { useContext, useLayoutEffect} from "react";
import {Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View,} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {CalendarContext, CalendarProvider} from "../Context";

const Layout = ({ children, ...restProps }) => {
    return (
        <CalendarProvider>
            <View className="flex-1 bg-[#4B225F] p-4 text-[#4A154B]" {...restProps}>
                {children}
            </View>
        </CalendarProvider>
    );
}
Layout.ScrollSection = ({ children, ...restProps }) => {
    return (
        <ScrollView className="flex-1" {...restProps}>
            {children}
        </ScrollView>
    );
}
Layout.CalendarSection = ({children, ...restProps}) => {
    return (
        <View className={'mb-5'} {...restProps}>
            {children}
        </View>
    )
}

Layout.ExpandEventModal = ({ children, ...restProps }) => {

    const {selectedTask, setSelectedTask} = useContext(CalendarContext);

    const onClose = () => {
        setSelectedTask(null);
    }

    if(!selectedTask){
        return null;
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 justify-center items-center bg-black/50">
                    <TouchableWithoutFeedback>
                        <View className="w-72 p-6 bg-[#EDEFF7] rounded-xl items-center">
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

Layout.AddEventModal = ({ children, navigation , ...restProps }) => {

    const {isAddEventModalVisible ,setIsAddEventModalVisible} = useContext(CalendarContext);

    const onClose = () => {
        setIsAddEventModalVisible(false);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setIsAddEventModalVisible(true)} style={{ marginRight: 15 }}>
                    <Ionicons name="add-circle-outline" size={30} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    if(!isAddEventModalVisible){
        return null;
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="flex-1 justify-center items-center bg-black/50">
                    <TouchableWithoutFeedback>
                        <View className="w-72 p-6 bg-[#EDEFF7] rounded-xl items-center">
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
export default Layout