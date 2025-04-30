import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Root: undefined;
  Splash: undefined;
  MainApp: undefined;
  Login: undefined;
  CreateAccount: undefined;
  VerifyCode: {
    phoneNumber: string;
  };
  Success: {
    message: string;
    description: string;
    nextAction?: {
      label: string;
      screen: keyof RootStackParamList;
      params?: object;
    };
  };
  SecurityPin: undefined;
  ConfirmSecurityPin: undefined;
  BVN: undefined;
  BVNConfirmation: undefined;
  Email: undefined;
  VerifyEmail: undefined;
  Dashboard: undefined;
  ForgotPassword: undefined;
  ForgotPinVerifyCode: undefined;
};

export type RootNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Root'
>;

export type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

export type VerifyCodeScreenRouteProp = RouteProp<
  RootStackParamList,
  'VerifyCode'
>;

export type VerifyCodeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'VerifyCode'
>;
export type VerifyCodeScreenProps = {
  route: VerifyCodeScreenRouteProp;
  navigation: VerifyCodeScreenNavigationProp;
};
export type CreateAccountScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateAccount'
>;
export type CreateAccountScreenProps = {
  navigation: CreateAccountScreenNavigationProp;
  route: {
    params: {
      phoneNumber: string;
    };
  };
};

export type SuccessScreenRouteProp = RouteProp<RootStackParamList, 'Success'>;

export type SuccessScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Success'
>;

export type SecurityPinRouteProp = RouteProp<RootStackParamList, 'SecurityPin'>;

export type ConfirmSecurityPinRouteProp = RouteProp<
  RootStackParamList,
  'ConfirmSecurityPin'
>;
export type BVNRouteProp = RouteProp<RootStackParamList, 'BVN'>;

export type BVNNavigationProp = StackNavigationProp<RootStackParamList, 'BVN'>;

export type BVNConfirmationNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BVNConfirmation'
>;

// export type EmailNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'Email'
// >;

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type LoginModalProps = {
  visible: boolean;
  onClose: () => void;
};
