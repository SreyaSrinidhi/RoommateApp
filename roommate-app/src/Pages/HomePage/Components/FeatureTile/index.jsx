import { Text, TouchableOpacity } from 'react-native';

export default function FeatureTile({ bgColor, flex, text, TileComponent, onPress, testID}) {
    return (
        <TouchableOpacity 
            className={`rounded-md flex justify-center items-center mx-1.5 ${bgColor} ${flex} ${TileComponent ? '' : 'h-48'}`} 
            onPress={onPress}
            testID={testID}
            >
            {TileComponent ? <TileComponent /> : <Text className="text-white text-xl text-center font-bold">{text}</Text>}
        </TouchableOpacity>    
    )
}
