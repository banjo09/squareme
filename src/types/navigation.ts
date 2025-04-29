import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Root: undefined;
  Splash: undefined;
  MainApp: undefined;
  Login: undefined;
};

export type RootNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Root'
>;

export type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type LoginModalProps = {
  visible: boolean;
  onClose: () => void;
};
