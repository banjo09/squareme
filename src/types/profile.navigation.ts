import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './navigation';

export type ProfileStackParamList = {
  Profile: undefined;
  Badges: undefined;
  MyRewards: undefined;
};

export type BadgesNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  'Badges'
>;

export type MyRewardsNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  'MyRewards'
>;

export type SplashProfileNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;
