import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
// import { Checkbox } from 'react-native-paper';
import { Text } from '../../theme/CustomText';

interface BillItemProps {
  title: string;
  description: string;
  onPress: () => void;
  image: ImageSourcePropType;
  background?: string;
  lastItem?: boolean;
}

const BillItem: React.FC<BillItemProps> = ({
  title,
  description,
  onPress,
  image,
  background,
  lastItem
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, !lastItem && styles.border]}
      onPress={onPress}
    >
      <View
        style={[
          styles.imageContainer,
          { backgroundColor: background ? background : undefined }
        ]}
      >
        <Image
          source={image}
          style={styles.avatar}
        />
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
    paddingVertical: 12,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#F4F5F5',
  },
  imageContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    fontFamily: 'ClashGrotesk-Medium',
    marginBottom: 4,
  },
  description: {
  },
  avatar: {
    width: 24,
    height: 24,
  },
});

export default BillItem;