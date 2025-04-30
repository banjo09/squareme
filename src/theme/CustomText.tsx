import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import React from 'react';
import { Colors } from '../utils/colors';

export interface CustomTextProps extends RNTextProps { }

export const Text: React.FC<CustomTextProps> = ({ style, ...props }) => {
  return (
    <RNText
      {...props}
      style={[
        {
          fontFamily: 'ClashGrotesk-Regular',
          color: Colors.primary
        },
        style
      ]}
    />
  );
};
