import React, { FC, ReactNode } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TextStyle,
  ViewStyle,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../utils/colors';

interface CustomTextInputProps extends TextInputProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  onRightIconPress?: () => void;
}

const CustomTextInput: FC<CustomTextInputProps> = ({
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  onRightIconPress,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <TextInput
        style={[styles.input, inputStyle]}
        {...props}
      />
      {rightIcon && (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={onRightIconPress}
          disabled={!onRightIconPress}>
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 54,
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'ClashGrotesk-Regular',
    color: Colors.black,
    paddingVertical: 0,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default CustomTextInput;
