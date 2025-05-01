import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type PaymentStackParamList = {
  Payments: undefined;
  Send_Request: undefined;
};

export type PaymentCategory = 'send' | 'request';

export type PaymentsNavigationProp = StackNavigationProp<
  PaymentStackParamList,
  'Payments'
>;

export type Send_RequestNavigationProp = StackNavigationProp<
  PaymentStackParamList,
  'Send_Request'
>;

export type Send_RequestRouteProp = RouteProp<
  PaymentStackParamList,
  'Send_Request'
>;
