import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import { HomeStackParamList } from '../types/home.navigation';
// import DetailScreen from '../screens/DetailScreen';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      {/* <Stack.Screen name="DetailScreen" component={DetailScreen} /> */}
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
