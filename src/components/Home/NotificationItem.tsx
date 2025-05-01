import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../utils/colors';
import { Text } from '../../theme/CustomText';

export interface NotificationItemProps {
  type: 'request' | 'withdrawal' | 'request-sent' | 'request-declined';
  title: string;
  description: string;
  time: string;
  amount?: string;
  reason?: string;
  sender?: string;
  onAccept?: () => void;
  onReject?: () => void;
  lastItem?: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  type,
  title,
  description,
  time,
  amount,
  reason,
  sender,
  onAccept,
  onReject,
  lastItem
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'request':
        return { icon: '📩', color: '#0066FF' };
      case 'withdrawal':
        return { icon: '💸', color: '#4CAF50' };
      case 'request-sent':
        return { icon: '✅', color: '#4CAF50' };
      case 'request-declined':
        return { icon: '❌', color: '#F44336' };
      default:
        return { icon: 'ℹ️', color: '#666' };
    }
  };

  const { icon, color } = getTypeStyles();

  return (
    <View
      style={[styles.container, !lastItem && styles.border]}
    >
      <View style={styles.imageContainer}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color='#00A5D1'
        />
      </View>
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>

        {/* {sender && (
          <Text style={styles.sender}>{sender}</Text>
        )}

        <Text style={styles.description}>{description}</Text> */}



        <Text style={styles.description}>
          {sender && (
            <Text style={styles.sender}>{sender} </Text>
          )}
          {description} {amount && reason && (
            <Text style={styles.details}>
              <Text style={styles.sender}>{amount} </Text>
              {/* {type != 'withdrawal' ? 'for' + "{reason}" : "{reason}"}  */}
              {type != 'withdrawal' ? `for "${reason}"` : reason}
            </Text>
          )}
        </Text>

        {/* {amount && reason && (
          <Text style={styles.details}>
            {amount} for "{reason}"
          </Text>
        )} */}

        {type === 'request' && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={onAccept}
            >
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.rejectButton]}
              onPress={onReject}
            >
              <Text>Reject</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    marginBottom: 16,
    flexDirection: 'row',
    // backgroundColor: 'red'
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#F4F5F5',
  },
  imageContainer: {
    width: 46,
    height: 46,
    borderRadius: 25,
    backgroundColor: '#CCF4FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  section: {
    width: '87%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 13,
    flex: 1,
  },
  time: {
    fontSize: 13,
    color: '#4C525E',
  },
  sender: {
    fontFamily: 'ClashGrotesk-Medium',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  details: {
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  acceptButton: {
    backgroundColor: Colors.accent,
  },
  rejectButton: {
    borderColor: Colors.accent,
    borderWidth: 1,

  },
  acceptText: {
    color: '#FFF',
  },
});

export default NotificationItem;