// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/StateManagement/store';
import Tabs from "./src/Components/Tabs";
import HomePage from "./src/Pages/HomePage";
import EmergencyNotifications from "./src/Pages/EmergencyNotifications";
import Setting from "./src/Pages/Setting";
import Calendar from "./src/Pages/Calander";
import LoginPage from "./src/Pages/LoginPage";
import ExpenseTrackerPage from "./src/Pages/Expenses";
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import Chat from "./src/Pages/Chat";
import SignUpPage from "./src/Pages/SignUpPage";
import TaskBoard from "./src/Pages/TaskBoard";

export default function App() {
    const pagesList = [
        { name: "Home", component: HomePage },
        { name: "Settings", component: Setting},
        {name: "Emergency Notifications", component: EmergencyNotifications},
        {name: "Calendar", component: Calendar},
        {name:"Login", component: LoginPage},
        {name:"Chat", component: Chat},
        {name:"Expenses", component: ExpenseTrackerPage},
        { name: "Task", component: TaskBoard },

    ];

    return (
        <Provider store={store}>
            <Tabs pagesList={pagesList} />
        </Provider>
    );
}
