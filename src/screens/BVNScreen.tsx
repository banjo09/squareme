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
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp, RootStackParamList } from '../types/navigation';
import { Text } from '../theme/CustomText';
import CustomButton from '../components/CustomButton';
import { StackNavigationProp } from '@react-navigation/stack';


const BVNScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleBvnClick = () => {
    console.log('Click');
  };

  const handleSubmit = () => {
    navigation.navigate('ConfirmSecurityPin')
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
          <Text style={styles.title}>Provide your BVN</Text>
        </View>

        <Text style={styles.instructionText}>
          Kindly provide your Bank Verification Number
        </Text>

        <Text style={styles.instructionText}>
          BVN
        </Text>

        <TouchableOpacity
          style={styles.bvnButton}
          onPress={handleBvnClick}
        >
          <Feather name="plus" size={36} color={Colors.primary} />
          <Text style={styles.instructionText}>
            BVN Click to add
          </Text>
        </TouchableOpacity>
        <CustomButton
          title="Submit"
          onPress={handleSubmit}
          mode='filled'
        // buttonStyle={styles.verifyButton}
        // textStyle={styles.forgotPinText}
        />
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
  bvnButton: {
    height: 58,
  },
});

export default BVNScreen;