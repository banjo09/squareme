import React, { FC } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  GestureResponderEvent,
  ActivityIndicator,
  View
} from 'react-native'
import { Colors } from '../utils/colors'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'default';
type ButtonMode = 'outline' | 'filled';

type CustomButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  mode?: ButtonMode;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  disabled?: boolean;
  spinnerColor?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const getVariantStyles = (variant: ButtonVariant, mode: ButtonMode) => {
  switch (variant) {
    case 'primary':
      return {
        borderColor: Colors.primary,
        textColor: mode === 'filled' ? 'white' : Colors.primary,
        backgroundColor: mode === 'filled' ? Colors.primary : 'transparent',
      };
    case 'secondary':
      return {
        borderColor: 'gray',
        textColor: mode === 'filled' ? 'white' : 'gray',
        backgroundColor: mode === 'filled' ? 'gray' : 'transparent',
      };
    case 'danger':
      return {
        borderColor: 'red',
        textColor: mode === 'filled' ? 'white' : 'red',
        backgroundColor: mode === 'filled' ? 'red' : 'transparent',
      };
    default:
      return {
        borderColor: Colors.accent,
        textColor: mode === 'filled' ? 'white' : Colors.accent,
        backgroundColor: mode === 'filled' ? Colors.accent : 'transparent',
      };
  }
};

export const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'default',
  // variant,
  mode = 'outline',
  buttonStyle,
  textStyle,
  loading = false,
  disabled = false,
  spinnerColor = Colors.white,
  leftIcon,
  rightIcon,
}) => {
  const variantStyles = getVariantStyles(variant, mode);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.secondaryButton,
        {
          borderColor: variantStyles.borderColor,
          backgroundColor: variantStyles.backgroundColor,
        },
        disabled && styles.disabledButton,
        buttonStyle,
      ]}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          <Text
            style={[
              styles.secondaryButtonText,
              { color: variantStyles.textColor },
              disabled && styles.disabledText,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton



const styles = StyleSheet.create({
  secondaryButton: {
    borderWidth: 1,
    // borderColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    // color: Colors.primary,
    fontSize: 15,
  },
  disabledButton: {
    borderColor: 'gray',
    backgroundColor: '#f0f0f0',
  },
  disabledText: {
    color: 'gray',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // icon: {
  //   marginHorizontal: 5,
  // },
  icon: {
    marginLeft: 4,
    marginRight: 4,
  }
})
