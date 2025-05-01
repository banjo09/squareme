import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';
import { Text } from '../../theme/CustomText';

interface ActionItemProps {
  title: string;
  description: string;
  onPress: () => void;
  icon: string;
  background?: string;
  color?: string;
}

const ActionItem: React.FC<ActionItemProps> = ({
  title,
  description,
  onPress,
  icon,
  color,
  background
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: background }]}
      >
        {/* {icon} */}
        <Ionicons name={icon} size={21} color={color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    marginBottom: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F5F5',
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontFamily: 'ClashGrotesk-Medium',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
  },
});

export default ActionItem;