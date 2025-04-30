import React, { useState, useEffect, useRef, FC } from 'react';
import { View, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../utils/colors';

interface PinInputProps {
  length: number;
  onComplete: (pin: string) => void;
  inputStyle?: ViewStyle
}

const PinInput: FC<PinInputProps> = ({ length, onComplete, inputStyle }) => {
  const [pin, setPin] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (pin.every(digit => digit !== '') && pin.join('').length === length) {
      onComplete(pin.join(''));
    }
  }, [pin]);

  const handleChange = (text: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (pin[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={ref => {
            if (ref) inputs.current[index] = ref;
          }}
          style={[styles.input, inputStyle]}
          keyboardType="number-pad"
          maxLength={1}
          value={pin[index]}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(index);
            }
          }}
        // secureTextEntry
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20
  },
  input: {
    width: 53,
    height: 53,
    backgroundColor: Colors.background,
    borderRadius: 8,
    marginRight: 10,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'ClashGrotesk-Regular',
    fontWeight: 'bold',
  },
});

export default PinInput;