import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import PinInput from '../components/PinInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp, RootStackParamList } from '../types/navigation';
import { Text } from '../theme/CustomText';
import CustomButton from '../components/CustomButton';
import { StackNavigationProp } from '@react-navigation/stack';

const bvnPoints = [
  'We request for your BVN to verify your identity and confirm that the account you provided is yours.',
  'Only access to your full name, phone number and date of birth is granted.',
  'Your BVN does not grant access to bank accounts or transaction details.',
  'Rest assured, your data is securely managed by us.',
];

const BVNScreen = () => {
  const [show, setShow] = useState(true);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleBvnClick = () => {
    console.log('Click');
  };

  const handleSubmit = () => {
    navigation.navigate('BVNConfirmation')
  };

  const handleBackClick = () => {
    navigation.goBack()
  };

  const onHideText = () => {
    setShow((show) => !show)
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
          <Text style={styles.title}>Provide your BVN</Text>
        </View>

        <Text style={styles.instructionText}>
          Kindly provide your Bank Verification Number
        </Text>

        <Text style={styles.bvnText}>
          BVN
        </Text>

        <TouchableOpacity
          style={styles.bvnButton}
          onPress={handleBvnClick}
        >
          <Feather name="plus" size={20} color={Colors.grey} />
          <Text style={styles.addText}>
            Click to add
          </Text>
        </TouchableOpacity>
        <View style={styles.infoButton}>
          <View style={styles.infoHeader}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color={Colors.taintPurple}
            />
            <Text style={styles.infoTopic}>
              Why we need your BVN?
            </Text>
            <Pressable onPress={onHideText} style={styles.arrowStyle}>
              <MaterialIcons
                name="keyboard-arrow-up"
                size={25}
                color={Colors.taintPurple}
              />
            </Pressable>
          </View>
          {show && bvnPoints.map((point, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bullet}>{'\u2022'}</Text>
              <Text style={styles.text}>{point}</Text>
            </View>
          ))}
        </View>

        <CustomButton
          title="Submit"
          onPress={handleSubmit}
          mode='filled'
          buttonStyle={styles.submitButton}
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
  bvnText: {
    fontSize: 15,
    marginBottom: 8,
  },
  addText: {
    fontSize: 12,
    color: Colors.grey,
    marginLeft: 5,
  },
  instructionText: {
    fontSize: 15,
    marginBottom: 30,
  },
  bvnButton: {
    height: 54,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8
  },
  submitButton: {
    marginTop: 'auto',
    marginBottom: 40
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoButton: {
    backgroundColor: Colors.taintPink,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 40,
    borderRadius: 8
  },
  infoTopic: {
    color: Colors.taintPurple,
    marginLeft: 10,
    fontFamily: 'ClashGrotesk-Medium'
  },
  arrowStyle: {
    marginLeft: 'auto',
    paddingRight: 10
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
    marginLeft: 7
  },
  bullet: {
    fontSize: 18,
    marginRight: 8,
    lineHeight: 22,
  },
  text: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default BVNScreen;