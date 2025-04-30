import React, { useState, useEffect } from 'react';
import {
  View,
  Text as RNText,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import PinInput from '../components/PinInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp, RootStackParamList } from '../types/navigation';
import { Text } from '../theme/CustomText';
import CustomButton from '../components/CustomButton';
import { StackNavigationProp } from '@react-navigation/stack';


const ConfirmSecurityPinScreen = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [pin, setPin] = useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handlePinComplete = (enteredPin: string) => {
    setPin(enteredPin);
    console.log('PIN entered:', enteredPin);
  };

  const handleSubmit = () => {
    console.log('Logging in with PIN:', pin);
    navigation.navigate('Success', {
      message: 'PIN Created Successfully!',
      description: 'You have successfully created your security pin.',
      nextAction: {
        label: 'Continue',
        screen: 'BVN',
        params: {},
      },
    });
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
          <Text style={styles.title}>Confirm  your Security PIN</Text>
        </View>

        <Text style={styles.instructionText}>
          Input your six (6) digit PIN again
        </Text>

        <PinInput length={6} onComplete={handlePinComplete} />

        {
          !isKeyboardVisible && <View style={styles.keyboardInactiveView}>

            <CustomButton
              title="Enter"
              onPress={handleSubmit}
              variant='primary'
              mode='filled'
              buttonStyle={styles.verifyButton}
            />
          </View>
        }
      </View>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 18,
    paddingTop: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    fontFamily: "ClashGrotesk-Medium",
    textAlign: 'center',
    paddingLeft: 20,
    paddingBottom: 2,
  },
  instructionText: {
    fontSize: 15,
    marginBottom: 20,
  },
  verifyButton: {
    height: 58,
  },
  keyboardInactiveView: {
    marginTop: 'auto',
    width: '100%',
    marginBottom: '15%'
  },
});

export default ConfirmSecurityPinScreen;