import { View, ScrollView } from 'react-native';
import FeatureTile from './Components/FeatureTile';
import { useNavigation } from '@react-navigation/native';
import CalendarWidget from "../Calander/PageLayout/Components/CalendarWidget/homeWidget";

export default function HomePage() {
    const navigation = useNavigation();

    return (
        <View>
            <ScrollView className="p-4 bg-[#4a154b]">
                {/* Row 1: empty wide container waiting for recent events */}
                <View className="flex-row justify-center mb-3">
                    <FeatureTile 
                        flex="flex-1"
                        bgColor="bg-blue-500"
                        text="Wide Tile - Full Width"
                        onPress={() => navigation.navigate('Calendar')}
                    />
                </View>

                {/* Row 2: Two short tiles side by side */}
                <View className="flex-row justify-center mb-3">
                    <FeatureTile 
                        flex="flex-1"
                        bgColor="bg-green-500"
                        text="Tall Tile 1"
                        onPress={() => console.log('Change me to navigation to go to a page!')}
                    />
                    <FeatureTile 
                        flex="flex-1"
                        bgColor="bg-red-500"
                        text="Tall Tile 2"
                        onPress={() => console.log('Change me to navigation to go to a page!')}
                    />
                </View>

                {/* Row 3: Calendar widget */}
                <View className="flex-row justify-center mb-3">
                    <FeatureTile 
                        flex="flex-1"
                        bgColor="bg-blue-500"
                        text="Wide Tile - Full Width"
                        TileComponent={CalendarWidget}
                        onPress={() => navigation.navigate('Calendar')}
                    />
                </View>

                {/* Row 4: Two tiles, one 2/3 width, the other 1/3 */}
                <View className="flex-row justify-center mb-3">
                {/*for some reason the flex-n values are not scaling proportionate to how i'd expect - not sure why...*/}
                <FeatureTile 
                        flex="flex-1"
                        bgColor="bg-purple-500"
                        text="2/3 Width Tile"
                        onPress={() => console.log('Change me to navigation to go to a page!')}
                    />
                    <FeatureTile 
                        flex="flex-2"
                        bgColor="bg-yellow-500"
                        text="1/3 Width Tile"
                        onPress={() => console.log('Change me to navigation to go to a page!')}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
