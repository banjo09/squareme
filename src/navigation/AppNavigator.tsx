import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Root from '../screens/Root';
// import MainTabNavigator from './MainTabNavigator';
import SplashScreen from '../screens/SplashScreen';
// import LoginScreen from '../screens/LoginScreen';
import { RootStackParamList } from '../types/navigation';
import LoginScreen from '../screens/LoginScreen';


const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Root"
      screenOptions={{
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter, // Slide animation
      }}
    >
      <Stack.Screen
        name="Root"
        component={Root}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="MainApp"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;