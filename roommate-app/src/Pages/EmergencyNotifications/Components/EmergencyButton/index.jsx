import { Text, TouchableOpacity } from 'react-native';
import { useContext } from 'react'
import { EmergencyContext } from '../../Context';


export default function EmergencyButton({ bgColor, title, message, buttonObject, isPermanent}) {
    const {setSelectedButton} = useContext(EmergencyContext);

    return (
        <TouchableOpacity 
            className={`rounded-full flex justify-center items-center w-40 h-40 shadow-lg mx-2 ${bgColor}`} 
            onPress={() => {
                console.log("Set selected button!");
                setSelectedButton(buttonObject)  //open edit modal when button selected
            }}
        >
            <Text className="text-white text-xl font-bold">{title}</Text>
        </TouchableOpacity>    
    )
}
