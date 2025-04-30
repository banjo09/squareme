import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { Colors } from '../utils/colors';
import { Text } from '../theme/CustomText';
import PinInput from '../components/PinInput';
import CustomButton from '../components/CustomButton';


const ForgotPinVerifyCodeScreen = () => {
  const [timer, setTimer] = useState(30);
  const [pin, setPin] = useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleVerify = () => {
    console.log('Verifying code:', pin);
    navigation.navigate('Success', {
      message: 'Verification Successful!',
      description: 'Your phone number has been verified successfully.',
      nextAction: {
        label: 'Continue',
        screen: 'SecurityPin',
        params: {
          label: 'Create new PIN',
          screen: 'Login',
          confirmSecurityScreenParams: {
            message: 'Pin Created Successfully!',
            description: 'You have successfully created a new pin. Try Logging in again to use your new pin to access your account.',
            label: 'Log in ',
          }
        },
      },
    });

  };

  const handleResendCode = () => {
    if (timer === 0) {
      setTimer(30);
    }
  };

  const handlePinComplete = (enteredPin: string) => {
    setPin(enteredPin);
    console.log('PIN entered:', enteredPin);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <MaterialIcons
            name="keyboard-backspace"
            size={25}
            color={Colors.primary}
          />
          <Text style={styles.title}>Verify your phone number</Text>
        </View>

        <Text style={styles.instruction}>
          Please input the five (5) digit code that was sent to your phone number below
        </Text>

        <PinInput
          length={5}
          onComplete={handlePinComplete}
          inputStyle={styles.inputStyle}
        />

        <TouchableOpacity
          style={[
            styles.resendButton,
            timer > 0 && styles.resendButtonDisabled,
          ]}
          onPress={handleResendCode}
          disabled={timer > 0}>
          <Text style={styles.resendText}>
            {timer > 0 ? `${timer.toString().padStart(2, '0')}:00` : 'Resend code'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.optionText}>
          Having trouble receiving a code, kindly try other methods below
        </Text>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Phone Call"
            onPress={handleVerify}
            buttonStyle={styles.verifyButton}
          />
          <CustomButton
            title="Whatsapp"
            onPress={handleVerify}
            mode='filled'
            buttonStyle={styles.verifyButton}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: "ClashGrotesk-Medium",
    textAlign: 'center',
    paddingLeft: 20,
    paddingBottom: 2,
  },
  instruction: {
    fontSize: 14,
    marginBottom: 32,
    lineHeight: 20,
  },
  optionText: {
    fontSize: 14,
    marginTop: 32,
  },
  inputStyle: {
    width: 62,
    height: 62,
  },
  resendButton: {
    alignSelf: 'center',
    marginBottom: 32,
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendText: {
    marginTop: 20,
    color: Colors.purple,
    fontSize: 15,
    fontFamily: "ClashGrotesk-Medium",
  },
  verifyButton: {
    height: 58,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 'auto',
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
});

export default ForgotPinVerifyCodeScreen;
