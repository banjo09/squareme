import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationItem, { NotificationItemProps } from '../components/Home/NotificationItem';
import { Colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../types/home.navigation';
import { Text } from '../theme/CustomText';

const notifications = [
  {
    id: '1',
    type: 'request',
    title: 'Request',
    sender: '+2348123456789',
    description: 'has requested',
    // description: 'has requested NGN 3,000 for "the money for battery."',
    time: 'Just now',
    amount: 'NGN 3,000',
    reason: 'the money for battery',
  },
  {
    id: '2',
    type: 'withdrawal',
    title: 'Withdrawal',
    description: 'Your withdrawal of',
    time: '12:30 AM',
    amount: 'NGN 30,000',
    reason: 'has been successfully deposited into your bank account.'
  },
  {
    id: '3',
    type: 'request-sent',
    title: 'Request Sent',
    description: 'Your request has been delivered to Jim Manor.',
    time: 'Yesterday',
    amount: 'NGN 30,000',
    reason: 'recharge card',
  },
  {
    id: '4',
    type: 'request',
    title: 'Request',
    sender: '+2348123456789',
    description: 'has requested NGN 3,000 for "the money for battery."',
    time: '1 hour ago',
    amount: 'NGN 3,000',
    reason: 'the money for battery',
  },
  {
    id: '5',
    type: 'request-declined',
    title: 'Request Declined',
    description: 'Your request has been declined by Jim Manor.',
    time: '1 Month ago',
    amount: 'NGN 30,000',
    reason: 'recharge card',
  },
];

const NotificationsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  const handleBackClick = () => {
    navigation.goBack()
  };

  const handleAccept = (id: string) => {
    console.log(`Accept notification ${id}`);
    // Handle accept logic
  };

  const handleReject = (id: string) => {
    console.log(`Reject notification ${id}`);
    // Handle reject logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="keyboard-backspace"
          size={25}
          color={Colors.primary}
          onPress={handleBackClick}
        />
        <Text style={styles.title}>Notifications</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notifications.map((notification, index) => (
          <NotificationItem
            key={notification.id}
            type={notification.type as NotificationItemProps['type']}
            title={notification.title}
            description={notification.description}
            time={notification.time}
            amount={notification.amount}
            reason={notification.reason}
            sender={notification.sender}
            onAccept={notification.type === 'request' ? () => handleAccept(notification.id) : undefined}
            onReject={notification.type === 'request' ? () => handleReject(notification.id) : undefined}
            lastItem={notifications.length - 1 == index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 24,
  },
  scrollContainer: {
    // paddingT: 16,
    marginHorizontal: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 20,
    fontFamily: "ClashGrotesk-Medium",
    textAlign: 'center',
    paddingLeft: 20,
    paddingBottom: 2,
  },
});

export default NotificationsScreen;