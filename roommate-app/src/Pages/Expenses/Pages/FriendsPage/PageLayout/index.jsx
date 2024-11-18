import {View} from "react-native";
import React from "react";

const Layout = ({ children, ...restProps }) => {
    return (
        <View className="flex-1 bg-[#4A154B] p-4" {...restProps}>
            {children}
        </View>
    );
}

export default Layout;
