import { View, ScrollView } from 'react-native';
import FeatureTile from './Components/FeatureTile';
import { useNavigation } from '@react-navigation/native';
import CalendarWidget from "../Calander/PageLayout/Components/CalendarWidget/homeWidget";
import Updates from './Components/RecentUpdates';

export default function HomePage() {
    const navigation = useNavigation();

    return (
        <View>
            <ScrollView className="p-4 bg-[#4B225F]">
                {/* Row 1: wide container for recent updates */}
                <View className="flex-row justify-center mb-3">
                    <FeatureTile
                        flex="flex-1"
                        bgColor="bg-blue-500"
                        text="Recent Updates"
                        TileComponent={Updates}
                        onPress={() => console.log('Should make it so no function pass needed :/')}
                        testID="updates-tile"
                    />
                </View>

                {/* Row 2: Two short tiles side by side */}
                <View className="flex-row justify-center mb-3">
                    <FeatureTile
                        flex="flex-1"
                        bgColor="bg-green-500"
                        text="Tall Tile 1"
                        onPress={() => console.log('Change me to navigation to go to a page!')}
                        testID="blank-tile-1"
                    />
                    <FeatureTile
                        flex="flex-1"
                        bgColor="bg-red-500"
                        text="Tall Tile 2"
                        onPress={() => console.log('Change me to navigation to go to a page!')}
                        testID="blank-tile-2"
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
                        testID="calendar-tile"
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
                        testID="blank-tile-3"
                    />
                    <FeatureTile
                        flex="flex-2"
                        bgColor="bg-yellow-500"
                        text="1/3 Width Tile"
                        onPress={() => console.log('Change me to navigation to go to a page!')}
                        testID="blank-tile-4"
                    />
                </View>
            </ScrollView>
        </View>
    );
}
