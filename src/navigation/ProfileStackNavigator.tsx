import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import { ProfileStackParamList } from '../types/profile.navigation';
import BadgesScreen from '../screens/BadgesScreen';
import MyRewardsScreen from '../screens/MyRewardsScreen';

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Badges" component={BadgesScreen} />
      <Stack.Screen name="MyRewards" component={MyRewardsScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
