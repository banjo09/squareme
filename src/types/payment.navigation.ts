import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './navigation';

export type PaymentStackParamList = {
  PaymentsScreen: undefined;
  Send_Request: undefined;
  Send_SquaremeTag: undefined;
  Request_SquaremeTag: undefined;
  ConfirmTransaction: undefined;
  Send_Beneficiaries: undefined;
  Request_Beneficiaries: undefined;
  Send_ContactList: undefined;
  Request_ContactList: undefined;
  SendBeneficiariesInput: undefined;
};

export type PaymentCategory = 'send' | 'request';

export type PaymentsNavigationProp = StackNavigationProp<
  PaymentStackParamList,
  'PaymentsScreen'
>;

export type Send_RequestNavigationProp = StackNavigationProp<
  PaymentStackParamList,
  'Send_Request'
>;

export type Send_RequestRouteProp = RouteProp<
  PaymentStackParamList,
  'Send_Request'
>;

export type SendSquaremeTagNavigationProp = StackNavigationProp<
  PaymentStackParamList,
  'Send_SquaremeTag'
>;

export type SendSquaremeTagRouteProp = RouteProp<
  PaymentStackParamList,
  'Send_SquaremeTag'
>;

export type ConfirmTransactionNavigationProp = StackNavigationProp<
  PaymentStackParamList,
  'ConfirmTransaction'
>;

export type ConfirmTransactionRootNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MainApp'
>;

export type ConfirmTransactionRouteProp = RouteProp<
  PaymentStackParamList,
  'ConfirmTransaction'
>;

export type Send_BeneficiariesNavigationProp = StackNavigationProp<
  PaymentStackParamList,
  'Send_Beneficiaries'
>;

export type Send_BeneficiariesRouteProp = RouteProp<
  PaymentStackParamList,
  'Send_Beneficiaries'
>;
