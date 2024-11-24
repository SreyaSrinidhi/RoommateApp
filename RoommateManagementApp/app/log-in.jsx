import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Animated, StyleSheet } from 'react-native';
import { useDispatch } from "react-redux";
import { Redirect, router } from "expo-router";
import { useNavigation } from "expo-router";
import { setId } from "@/StateManagement/Slices/UserSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state here
    const [scale] = useState(new Animated.Value(1)); // Animation for button press
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleLogin = () => {
        if (username && password) {
            handleAuth();
        } else {
            Alert.alert('Error', 'Please enter both username and password.');
        }
    };

    const handleAuth = async () => {
        setLoading(true); // Set loading to true when authentication starts
        try {
            console.log(auth);
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            dispatch(setId(userCredential.user.uid));
            router.navigate("/");
        } catch (e) {
            Alert.alert('Sign in failed', e.message);
        } finally {
            setLoading(false); // Reset loading to false when authentication completes
        }
    };

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(scale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Roommate App</Text>

            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Animated.View style={[styles.buttonContainer, { transform: [{ scale }] }]}>
                <TouchableOpacity
                    onPress={() => {
                        animateButton();
                        handleLogin();
                    }}
                    style={styles.button}
                >
                    {loading ? (
                        <Text style={styles.buttonText}>Loading...</Text> // Show loading indicator
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity onPress={() => navigation.navigate('sign-in')}>
                <Text style={styles.signUpText}>Click here to Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDEFF7', // Light gray background
        padding: 20,
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 48,
        color: '#4A154B',
        letterSpacing: 2,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4A154B',
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    input: {
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderColor: '#4A154B',
        borderRadius: 24,
        paddingHorizontal: 16,
        marginBottom: 20,
        backgroundColor: '#EDEFF7',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#2BAC76',
        paddingVertical: 16,
        borderRadius: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#4A154B',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    signUpText: {
        color: '#4A154B',
        fontSize: 14,
        marginTop: 10,
    },
});

export default LoginPage;