import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomTextInput from '../components/CustomTextInput';
import { Colors } from '../utils/colors';
import { RootStackParamList } from '../types/navigation';
import CustomButton from '../components/CustomButton';
import { Text } from '../theme/CustomText';


const { width } = Dimensions.get('window');

const ForgotPasswordScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('080 0000 000');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleNextClick = () => {
    navigation.navigate('ForgotPinVerifyCode');
  };

  const nigeriaFlag = (
    <Image
      source={require('../assets/flag.png')}
      style={{ width: 24, height: 24 }}
    />
  );

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
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
          <Text style={styles.subtitle}>
            Forgot PIN
          </Text>
          <Text style={styles.instruction}>
            Enter your phone number and we'll send an SMS with a
            code to verify your phone number.
          </Text>

          <View>
            <Text style={styles.label}>Phone Number</Text>
            <CustomTextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              leftIcon={nigeriaFlag}
              containerStyle={styles.inputContainer}
            />
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Next"
              onPress={handleNextClick}
              variant='primary'
              mode='filled'
              buttonStyle={styles.nextButton}
            />
            <View style={styles.keyboardActiveView}>
              <Text style={styles.notUserText}>
                Already have an account?
              </Text>
              <CustomButton
                title="Login here"
                onPress={handleLogin}
                variant='primary'
                text
                buttonStyle={styles.logoutButton}
                textStyle={styles.forgotPinText}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    // paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'ClashGrotesk-Medium',
    marginBottom: 10,
  },
  instruction: {
    fontSize: 15,
    marginBottom: 32,
    lineHeight: 24,
  },
  keyboardActiveView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  version: {
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 20
  },

  label: {
    fontSize: 15,
    color: Colors.black,
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  logoutButton: {
    marginLeft: 5
  },
  forgotPinText: {
    fontSize: 15,
    color: Colors.purple
  },
  notUserText: {
    fontSize: 15,
  },

  buttonContainer: {
    width: '100%',
    marginBottom: 60,
    marginTop: 'auto',
  },

  nextButton: {
    height: 59,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;
