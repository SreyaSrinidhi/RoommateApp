import Tabs from "./src/Components/Tabs";
import HomePage from "./src/Pages/HomePage";
import Tester from "./src/Pages/HomePage/Components/Tester";
import Calendar from "./src/Pages/Calander";
import {Provider} from "react-redux";
import {store} from "./src/StateManagement/store";
import LoginPage from "./src/Pages/LoginPage";
import ExpenseTrackerPage from "./src/Pages/Expenses";
import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";

export default function App() {

    const pagesList = [
        { name: "Home", component: HomePage },
        { name: "Settings", component: Tester },
        {name: "Calendar", component: Calendar},
        {name:"Login", component: LoginPage},
        {name:"Expenses", component: ExpenseTrackerPage}
    ];

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tabs pagesList={pagesList} />
            </NavigationContainer>
        </Provider>
    );
}
