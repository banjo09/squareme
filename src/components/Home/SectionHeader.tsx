import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../theme/CustomText';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    fontFamily: 'ClashGrotesk-Medium',
    color: '#2E3A59',
    marginBottom: 8,
  },
});

export default SectionHeader;