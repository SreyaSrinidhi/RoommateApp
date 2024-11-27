import { Redirect, Stack } from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import { auth } from "../../firebase.config"; // Ensure this is correct
import { useState, useEffect } from "react";
import {View, ActivityIndicator, PermissionsAndroid, Alert} from "react-native";
import messaging from "@react-native-firebase/messaging";
import {saveFCMToken} from "@/StateManagement/Slices/UserSlice";

export default function RootLayout() {
  const id = useSelector((state) => state.user.id);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const onAuthStateChanged = (currentUser) => {
    console.log("onAuthStateChanged", currentUser);
    setUser(currentUser);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        const token = await messaging().getToken();
        dispatch(saveFCMToken({ uid: id, fcmToken: token }));
      } catch (error) {
        // console.error("Error fetching FCM token:", error);
      }
    };
    fetchFCMToken();

    // Listener for token refresh
    const unsubscribe = messaging().onTokenRefresh((token) => {
      dispatch(saveFCMToken({ uid: id, fcmToken: token }));
    });

    return unsubscribe; // Cleanup listener on component unmount
  }, []);

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage.notification));
    });

    return unsubscribe; // Cleanup listener on component unmount
  }, []);

  if (!user && !initializing) {
    return <Redirect href="/log-in" />;
  }



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

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="../../PageElements/TesterPage/index" options={{ title: 'Tester Page' }} /> */}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
