import { View, ScrollView } from 'react-native';
import FeatureTile from './Components/FeatureTile';
import { useNavigation } from '@react-navigation/native';
import CalendarWidget from "../Calander/PageLayout/Components/CalendarWidget/homeWidget";
import Updates from './Components/RecentUpdates';
import ExpensesWiget from "../Expenses/Pages/FriendsPage/PageLayout/Components/ExpensesWiget";
import TaskBoardWidget from "../TaskBoard/PageLayout/Components/TaskBoardWidget";

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
                        text="Emergency Notifications"
                        onPress={() => navigation.navigate('Emergency Notifications')}
                        testID="emergency-notifications-tile"
                    />
                    <FeatureTile
                        flex="flex-1"
                        bgColor="bg-red-500"
                        text="Chat"
                        onPress={() => navigation.navigate('Chat')}
                        testID="chat-tile"
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

                {/* Row 3: Calendar widget */}
                <View className="flex-row justify-center mb-3 h-fit">
                    <FeatureTile
                        flex="flex-1"
                        text="Wide Tile - Full Width"
                        TileComponent={ExpensesWiget}
                        onPress={() => navigation.navigate('Expenses')}
                        testID="expenses-tile"
                    />
                </View>

                {/* Row 4: Two tiles, one 2/3 width, the other 1/3 */}
                <View className="flex-row justify-center mb-3 h-fit ">
                    <FeatureTile
                        flex="flex-1"
                        TileComponent={TaskBoardWidget} // Replace yellow tile with TaskBoardWidget
                        testID="taskboard-widget"
                    />
                </View>
            </ScrollView>
        </View>
    );
}
