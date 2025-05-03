import { createStackNavigator } from '@react-navigation/stack';
import PaymentsScreen from '../screens/PaymentsScreen';
import { PaymentStackParamList } from '../types/payment.navigation';
import Send_Request_Screen from '../screens/Send_Request_Screen';
import SendSquaremeTagScreen from '../screens/SendSquaremeTagScreen';
import ConfirmTransactionScreen from '../screens/ConfirmTransactionScreen';
import SendBeneficiariesScreen from '../screens/SendBeneficiariesScreen';
import SendBeneficiariesInputScreen from '../screens/SendBeneficiariesInputScreen';
import SendContactsScreen from '../screens/SendContactsScreen';
import RequestSquaremeTagScreen from '../screens/RequestSquaremeTagScreen';

const Stack = createStackNavigator<PaymentStackParamList>();

const PaymentStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PaymentsScreen" component={PaymentsScreen} />
      <Stack.Screen name="Send_Request" component={Send_Request_Screen} />
      <Stack.Screen name="Send_SquaremeTag" component={SendSquaremeTagScreen} />
      <Stack.Screen name="ConfirmTransaction" component={ConfirmTransactionScreen} />
      <Stack.Screen name="Send_Beneficiaries" component={SendBeneficiariesScreen} />
      <Stack.Screen name="SendBeneficiariesInput" component={SendBeneficiariesInputScreen} />
      <Stack.Screen name="Send_Contacts" component={SendContactsScreen} />
      <Stack.Screen name="Request_SquaremeTag" component={RequestSquaremeTagScreen} />
    </Stack.Navigator>
  );
};

export default PaymentStackNavigator;
