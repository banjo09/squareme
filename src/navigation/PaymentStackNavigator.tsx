import { createStackNavigator } from '@react-navigation/stack';
import PaymentsScreen from '../screens/PaymentsScreen';
import { PaymentStackParamList } from '../types/payment.navigation';
import Send_Request_Screen from '../screens/Send_Request_Screen';

const Stack = createStackNavigator<PaymentStackParamList>();

const PaymentStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Payments" component={PaymentsScreen} />
      <Stack.Screen name="Send_Request" component={Send_Request_Screen} />
    </Stack.Navigator>
  );
};

export default PaymentStackNavigator;
