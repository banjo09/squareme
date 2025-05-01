import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type HomeStackParamList = {
  Home: undefined;
  Notification: undefined;
  // VerifyCode: {
  //   phoneNumber: string;
  // };
  // Success: {
  //   message: string;
  //   description: string;
  //   nextAction?: {
  //     label: string;
  //     screen: keyof RootStackParamList;
  //     params?: object;
  //   };
  // };
};

export type RootNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Home'
>;

export type NotificationNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Notification'
>;

// export type VerifyCodeScreenRouteProp = RouteProp<
//   RootStackParamList,
//   'VerifyCode'
// >;

// export type VerifyCodeScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'VerifyCode'
// >;
