// src/Components/Tabs.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useSelector } from "react-redux";

const Tabs = ({ pagesList }) => {
    const Tab = createBottomTabNavigator();
    const { id } = useSelector((state) => state.user); // Grab the user's ID from the Redux store

    if (!id) {
        const LoginPage = pagesList.find(page => page.name === "Login").component;
        return <LoginPage />;
    }

    return (
        <Tab.Navigator id={1}>
            {pagesList
                .filter((page) => page.name !== "Login")
                .map((page, index) => (
                    <Tab.Screen
                        key={page.name || `page-${index}`}
                        name={page.name}
                        component={page.component}
                        options={{ tabBarLabel: page.name }}
                    />
                ))}
        </Tab.Navigator>
    );
};

export default Tabs;
