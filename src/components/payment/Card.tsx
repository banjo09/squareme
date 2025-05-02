import React, { FC, ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from '../../theme/CustomText';
import { Colors } from '../../utils/colors';

interface CardProps {
  Icon: ReactNode;
  title: string;
  content: string;
  actionIcon: ReactNode;
  onPress?: () => void;
}

const Card: FC<CardProps> = ({
  Icon,
  title,
  content,
  actionIcon,
  onPress
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.icon}>
        {/* <Icon/> */}
        {Icon}
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        {
          content && <Text style={styles.dateStyle}>
            {content}
          </Text>
        }
      </View>

      <View style={styles.actionContainer}>
        {actionIcon}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    marginBottom: 7,
  },
  dateStyle: {
    fontSize: 15,
    color: '#70747E',
  },
  actionContainer: {
    alignItems: 'flex-end',
  },
});

export default Card;