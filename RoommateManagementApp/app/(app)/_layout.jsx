import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { auth } from "../../firebase.config";
import { PermissionsAndroid } from "react-native";

export default function RootLayout() {
  const id = useSelector((state) => state.user.id);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = (currentUser) => {
    setUser(currentUser);
    if (initializing) setInitializing(false);
  };

  // Request permissions for notifications
  useEffect(() => {
    const requestPermissions = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Notification permissions granted.");
      } else {
        console.log("Notification permissions denied.");
      }
    };

    requestPermissions();
  }, []);

  // Log FCM Token
  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log("FCM Token:", token);
      } catch (error) {
        console.error("Error fetching FCM token:", error);
      }
    };

    fetchFCMToken();

    // Listener for token refresh
    const unsubscribe = messaging().onTokenRefresh((token) => {
      console.log("FCM Token refreshed:", token);
    });

    return unsubscribe; // Cleanup listener on component unmount
  }, []);

  // Handle foreground notifications
  useEffect(() => {
    if (user) {
      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body
        );
      });

      return unsubscribe;
    }
  }, [user]); // Cleanup listener on component unmount

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return () => unsubscribe();
  }, []);

  if (initializing) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/log-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}