import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from '../../theme/CustomText';

interface TransactionItemProps {
  title: string;
  description: string;
  amount: string;
  onPress?: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  title,
  description,
  amount,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="message-minus-outline"
          size={23}
          color='rgba(99, 104, 255, 0.73)'
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Text style={styles.amount}>{amount}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'flex-start',
    paddingRight: 17
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontFamily: 'ClashGrotesk-Medium',
    marginBottom: 15,
    color: '#292D32'
  },
  description: {
    fontFamily: 'ClashGrotesk-Medium',
    fontSize: 14,
    color: '#70747E',
  },
  amount: {
    fontSize: 15,
    fontFamily: 'ClashGrotesk-Medium',
    alignSelf: 'flex-end'
  },
});

export default TransactionItem;