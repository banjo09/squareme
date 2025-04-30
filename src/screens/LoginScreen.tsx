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
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../utils/colors';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp, RootStackParamList } from '../types/navigation';
import { Text } from '../theme/CustomText';
import CustomButton from '../components/CustomButton';
import { StackNavigationProp } from '@react-navigation/stack';


const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
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

  const handleLogin = () => {
    console.log('Logging in with PIN:', pin);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      })
    );
  };

  const handleUseBiometrics = () => { };

  const handleLogout = () => {
    navigation.navigate('Splash')
  };

  const handleForgotPin = () => {
    navigation.navigate('ForgotPassword')
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
            }}
          />
          <Feather name="help-circle" size={20} color={Colors.primary} />
        </View>

        <Text style={styles.welcomeText}>
          Welcome back John
        </Text>
        <Text style={styles.instructionText}>
          Enter your PIN to access your Squareme account
        </Text>

        <PinInput length={6} onComplete={handlePinComplete} />

        {isKeyboardVisible ? (
          <View style={styles.keyboardActiveView}>
            <Text style={styles.notUserText}>Not John?</Text>
            <CustomButton
              title="Log out"
              onPress={handleLogout}
              variant='primary'
              text
              buttonStyle={styles.logoutButton}
              textStyle={styles.forgotPinText}
            />
          </View>
        ) : (
          <View style={styles.keyboardInactiveView}>
            <CustomButton
              title="Forgot PIN?"
              onPress={handleForgotPin}
              variant='primary'
              text
              buttonStyle={styles.forgotPinButton}
              textStyle={styles.forgotPinText}
            />

            <View style={styles.biometricsView}>
              <TouchableOpacity
                style={styles.biometricsButton}
                onPress={handleUseBiometrics}
              >
                <Ionicons name="finger-print-sharp" size={36} color={Colors.primary} />
              </TouchableOpacity>
              <Text style={styles.biometricsText}>Use Biometrics</Text>
            </View>

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Log In"
                onPress={handleLogin}
                variant='primary'
                mode='filled'
              />
              <View style={styles.keyboardActiveView}>
                <Text style={styles.notUserText}>Not John?</Text>
                <CustomButton
                  title="Log out"
                  onPress={handleLogout}
                  variant='primary'
                  text
                  buttonStyle={styles.logoutButton}
                  textStyle={styles.forgotPinText}
                />
              </View>
              <Text style={styles.version}>v2.5.501</Text>
            </View>
          </View>
        )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  version: {
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 20
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: 'ClashGrotesk-Medium',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 15,
    marginBottom: 20,
  },
  keyboardActiveView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  notUserText: {
    fontSize: 15,
  },
  keyboardInactiveView: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPinButton: {
    marginTop: 5,
  },
  logoutButton: {
    marginLeft: 5
  },
  forgotPinText: {
    fontSize: 15,
    color: Colors.purple
  },
  biometricsButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.light,
    backgroundColor: Colors.lighter,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  biometricsView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: height * 0.35
  },
  biometricsText: {
    fontSize: 15,
  },
  loginButton: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#0066cc',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
  },
});

export default LoginScreen;