import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Root from '../screens/Root';
import SplashScreen from '../screens/SplashScreen';
import { RootStackParamList } from '../types/navigation';
import LoginScreen from '../screens/LoginScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import SuccessScreen from '../screens/SuccessScreen';
import SecurityPinScreen from '../screens/SecurityPinScreen';
import ConfirmSecurityPinScreen from '../screens/ConfirmSecurityPinScreen';
import BVNScreen from '../screens/BVNScreen';
import BVNConfirmationScreen from '../screens/BVNConfirmationScreen';
import EmailScreen from '../screens/EmailScreen';
import VerifyEmailScreen from '../screens/VerifyEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ForgotPinVerifyCodeScreen from '../screens/ForgotPinVerifyCodeScreen';
import MainTabNavigator from './MainTabNavigator';


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
      <Stack.Screen
        name="BVNConfirmation"
        component={BVNConfirmationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Email"
        component={EmailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPinVerifyCode"
        component={ForgotPinVerifyCodeScreen}
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
        name="SecurityPin"
        component={SecurityPinScreen}
        options={{ headerShown: false }}
      /> */}
      {/* <Stack.Screen
        name="SecurityPin"
        component={SecurityPinScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="MainApp"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;