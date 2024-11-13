import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import LoginPage from "../../Pages/LoginPage";
import SignUpPage from "../../Pages/SignUpPage";

const Tabs = ({ pagesList }) => {
    const Tab = createBottomTabNavigator();
    const { id } = useSelector((state) => state.user); // Assuming `id` signifies logged-in state
    const [isSigningUp, setIsSigningUp] = useState(false); // Track if user is on signup

    // Conditional navigation for Login or Signup
    const AuthPage = isSigningUp ? SignUpPage : LoginPage;

    if (!id) {
        console.log("No Id found")
        return (
            <NavigationContainer>
                <AuthPage onSwitch={() => setIsSigningUp(!isSigningUp)} />
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerStyle: {
                        backgroundColor: '#75597B',
                        borderBottomWidth: 0,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: { fontSize: 24, fontWeight: 'bold' },
                    headerTitleAlign: 'left',
                    tabBarStyle: {
                        backgroundColor: '#75597B',
                        borderTopWidth: 0,
                    },
                    tabBarLabelStyle: {
                        color: '#FFFFFF',
                        fontSize: 12,
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ color }) => {
                        const iconSize = 20;
                        if (route.name === 'Home') {
                            return <MaterialIcons name="home" size={iconSize} color={color} />;
                        } else if (route.name === 'Settings') {
                            return <FontAwesome5 name="cog" size={iconSize} color={color} />;
                        } else if (route.name === 'Calendar') {
                            return <Entypo name="calendar" size={iconSize} color={color} />;
                        } else if (route.name === 'Chat') {
                            return <FontAwesome5 name="comments" size={iconSize} color={color} />;
                        }
                        return null;
                    },
                    tabBarActiveTintColor: '#FFFFFF',
                    tabBarInactiveTintColor: '#D3D3D3',
                })}
            >
                {pagesList
                    .filter((page) => page.name !== "Login")
                    .map((page, index) => (
                        <Tab.Screen
                            key={page.name || `page-${index}`}
                            name={page.name}
                            component={page.component}
                            options={{
                                tabBarLabel: page.name,
                            }}
                        />
                    ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Tabs;
