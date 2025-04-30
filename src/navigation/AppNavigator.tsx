import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Root from '../screens/Root';
// import MainTabNavigator from './MainTabNavigator';
import SplashScreen from '../screens/SplashScreen';
// import LoginScreen from '../screens/LoginScreen';
import { RootStackParamList } from '../types/navigation';
import LoginScreen from '../screens/LoginScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import SuccessScreen from '../screens/SuccessScreen';
import SecurityPinScreen from '../screens/SecurityPinScreen';
import ConfirmSecurityPinScreen from '../screens/ConfirmSecurityPinScreen';
import BVNScreen from '../screens/BVNScreen';


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
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyCode"
        component={VerifyCodeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SecurityPin"
        component={SecurityPinScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfirmSecurityPin"
        component={ConfirmSecurityPinScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BVN"
        component={BVNScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="SecurityPin"
        component={SecurityPinScreen}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="SecurityPin"
        component={SecurityPinScreen}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="MainApp"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;