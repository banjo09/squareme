import React, { useState, useEffect } from 'react';
import {
  View,
  // Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import PinInput from '../components/PinInput';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../types/navigation';
import { Text } from '../theme/CustomText';



const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [pin, setPin] = useState('');

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
    // Here you would typically verify the PIN
    console.log('PIN entered:', enteredPin);
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in with PIN:', pin);
  };

  const handleUseBiometrics = () => {
    // Handle biometrics login logic here
    console.log('Using biometrics');
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out');
  };

  const handleForgotPin = () => {
    // Handle forgot PIN logic here
    console.log('Forgot PIN');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require('../assets/logolight.png')}
            style={{
              width: width * 0.4,
              height: 24,
              // marginTop: 20,
              // marginBottom: 20,
              // alignSelf: 'center',
              // resizeMode: 'contain',
            }}
          />
          <Feather name="help-circle" size={30} color={Colors.primary} />;
          <Text style={styles.version}>v2.5.501</Text>
        </View>

        {/* Welcome Message */}
        <Text style={styles.welcomeText}>Welcome back John</Text>
        <Text style={styles.instructionText}>Enter your PIN to access your Squareme account</Text>

        {/* PIN Input */}
        <PinInput length={6} onComplete={handlePinComplete} />

        {/* Dynamic Bottom Section */}
        {isKeyboardVisible ? (
          <View style={styles.keyboardActiveView}>
            <Text style={styles.notUserText}>Not John?</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.keyboardInactiveView}>
            <TouchableOpacity onPress={handleForgotPin}>
              <Text style={styles.forgotPinText}>Forgot PIN?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.biometricsButton} onPress={handleUseBiometrics}>
              <Text style={styles.biometricsText}>Use Biometrics</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Numeric Keypad (would be shown by system keyboard) */}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  version: {
    fontSize: 12,
    color: '#888',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  keyboardActiveView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  notUserText: {
    fontSize: 14,
    color: '#666',
  },
  logoutText: {
    fontSize: 14,
    color: '#0066cc',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  keyboardInactiveView: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPinText: {
    fontSize: 14,
    color: '#0066cc',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  biometricsButton: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0066cc',
    alignItems: 'center',
    marginBottom: 15,
  },
  biometricsText: {
    color: '#0066cc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#0066cc',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;