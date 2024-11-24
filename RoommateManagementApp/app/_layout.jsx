import { Slot } from 'expo-router';
import {Provider} from "react-redux";
import {store} from "@/StateManagement/store";
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

export default function Root() {

    return (
        <Provider store={store}>
            <Slot />
        </Provider>
    );

}
