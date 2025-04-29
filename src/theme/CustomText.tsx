import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import React from 'react';

export interface CustomTextProps extends RNTextProps { }

export const Text: React.FC<CustomTextProps> = ({ style, ...props }) => {
  return (
    <RNText
      {...props}
      style={[{ fontFamily: 'SpaceGrotesk' }, style]}
    // style={[{ fontFamily: 'ClashGrotesk' }, style]}
    />
  );
};
