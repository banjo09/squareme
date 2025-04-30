import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomTextInput from '../components/CustomTextInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, VerifyCodeScreenRouteProp } from '../types/navigation';
import { Colors } from '../utils/colors';
import { Text } from '../theme/CustomText';
import PinInput from '../components/PinInput';
import CustomButton from '../components/CustomButton';

const { width, height } = Dimensions.get('window');

const VerifyCodeScreen = () => {
  const [timer, setTimer] = useState(30);
  const [pin, setPin] = useState('');

  const route = useRoute<VerifyCodeScreenRouteProp>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const phoneNumber = route.params?.phoneNumber || '';

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
          label: 'Set your Security PIN',
          screen: 'BVN',
          confirmSecurityScreenParams: {
            message: 'PIN Created Successfully!',
            description: 'You have successfully created your security pin.',
            label: 'Continue',
          }
        },
      },
    });
  };

  const handleBackClick = () => {
    navigation.goBack()
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
            onPress={handleBackClick}
          />
          <Text style={styles.title}>Verify your phone number</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/paper-airplane.png')}
            style={{
              width: width * 0.8,
              height: 140,
              resizeMode: 'contain',
            }}
          />
        </View>

        <Text style={styles.subtitle}>Check your WhatsApp</Text>
        <Text style={styles.instruction}>
          Please input the five (5) digit code that was sent to your Whatsapp below
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

        <CustomButton
          key={pin.length}
          title="Verify"
          onPress={handleVerify}
          mode='filled'
          buttonStyle={[
            styles.verifyButton,
            pin.length < 5 && styles.verifyButtonDisabled,
          ]}
        />
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink'
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: "ClashGrotesk-Medium",
    marginBottom: 8,
  },
  instruction: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
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
    // backgroundColor: '#0066FF',
    // borderRadius: 8,
    height: 58,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 60,
  },
  verifyButtonDisabled: {
    backgroundColor: Colors.disabled,
    borderColor: Colors.disabled,
  },
  verifyButtonRemoveDisabled: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  verifyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VerifyCodeScreen;
