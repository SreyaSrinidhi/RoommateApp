import { ScrollView, View } from 'react-native';
import ButtonGrid from './Components/ButtonGrid'
import AddButtonModal from './Components/AddButtonModal';
import EmergencyButtonModal from './Components/EmergencyButtonModal'
import {useSelector} from "react-redux";
import {EmergencyContext, EmergencyProvider} from "./Context";


export default function EmergencyNotifications( {navigation} ) {
    const {buttons} = useSelector(state => state.emergency);

    return (
        <EmergencyProvider>
            <AddButtonModal navigation={navigation}/>
            <EmergencyButtonModal/>
            <ScrollView className="p-4 bg-[#4a154b]" testID='emergency-notifications-page'>
                <ButtonGrid 
                    buttonData={buttons}
                />  
            </ScrollView>
        </EmergencyProvider>
    );
}