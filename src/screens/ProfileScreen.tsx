import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  GestureResponderEvent
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Card from '../components/payment/Card';
import { Colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { SplashProfileNavigationProp } from '../types/profile.navigation';
import { Text } from '../theme/CustomText';

const menuItems = [
  { id: 'bank', title: 'Bank Account', icon: require('../assets/bank.png') },
  { id: 'account', title: 'Account Management', icon: require('../assets/money.png') },
  { id: 'statement', title: 'Account Statement', icon: require('../assets/document.png') },
  { id: 'rewards', title: 'Rewards', icon: require('../assets/discount.png'), loc: 'MyRewards' },
  { id: 'badges', title: 'Badges', icon: require('../assets/medal.png'), loc: 'Badges' },
  { id: 'security', title: 'Security', icon: require('../assets/tick.png') },
  { id: 'help', title: 'Help & Support', icon: require('../assets/question.png') },
];

const ProfileScreen = () => {
  const navigation = useNavigation<SplashProfileNavigationProp>();

  const handleLogOutClick = (event: GestureResponderEvent) => {
    navigation.navigate('Splash' as never)
  };

  const handleProfileItemClick = (loc?: string) => {
    navigation.navigate(loc as never)
  };

  const Icon = (
    <Image
      source={require('../assets/profile.png')}
      style={{
        width: 42,
        height: 45,
        resizeMode: 'contain',
      }}
    />
  );
  const actionIcon = <View style={styles.endView}>
    <Text style={styles.tier}>TIFR 2</Text>
    <MaterialIcons name="chevron-right" size={24} color={Colors.icon} />
  </View>

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Profile</Text>
        <Card
          title='David Oloye'
          content='+23480888976'
          onPress={() => { }}
          Icon={Icon}
          actionIcon={actionIcon}
          borderBottom
        />

        <View style={styles.menuContainer}>
          {menuItems.map((item) => {
            const Icon = (
              <Image
                source={item.icon}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            )
            const actionIcon = <MaterialIcons name="chevron-right" size={24} color="#23262F" />

            return (
              <Card
                key={item.id}
                Icon={Icon}
                title={item.title}
                actionIcon={actionIcon}
                onPress={() => handleProfileItemClick(item.loc)}
              />
            )
          }
          )}
        </View>
      </ScrollView>
      <Pressable style={styles.logoutStyle} onPress={handleLogOutClick}>
        <Feather name="log-out" size={24} color={Colors.red} />
        <Text style={styles.logoutText}>
          Log out
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 25,
  },
  scrollContainer: {
    padding: 18,
    paddingBottom: 10,
  },
  header: {
    marginBottom: 18,
    fontSize: 20,
    fontFamily: "ClashGrotesk-Medium",
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  endView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tier: {
    fontSize: 12,
    color: Colors.green,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: Colors.lighter,
    borderRadius: 8,
  },
  menuContainer: {
    marginTop: 16,
    gap: 5
  },
  logoutStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 30,
  },
  logoutText: {
    color: Colors.red,
    fontSize: 17,
    fontFamily: "ClashGrotesk-Medium",
  },
});

export default ProfileScreen;