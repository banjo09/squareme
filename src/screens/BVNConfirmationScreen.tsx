import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BVNConfirmationNavigationProp, } from '../types/navigation';
import { Text } from '../theme/CustomText';
import CustomButton from '../components/CustomButton';

const BVNConfirmationScreen = () => {
  const navigation = useNavigation<BVNConfirmationNavigationProp>();

  const handleNoClick = () => {
    navigation.navigate('Email');

  };
  const handleYesClick = () => {
    console.log('Thank you')
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>

        <View style={styles.wrapper}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/message.png')}
              style={{
                width: 260,
                height: 230,
                // resizeMode: 'contain',
              }}
            />

            <Text style={styles.subtitle}>Stay in the Loop!</Text>
            <Text style={styles.instruction}>
              Get ready to be the first to know about all the cool stuff happening at Squareme!
              From new features and product updates to exclusive offers and insider tips,
              we’ll make sure you’re always ahead of the curve.
            </Text>
            <Text style={styles.instruction2}>
              Excited to stay connected? Just hit the button below and let us keep you in the know!
            </Text>
          </View>

          <CustomButton
            title='Yes, please'
            onPress={handleYesClick}
            mode='filled'
            buttonStyle={styles.yesButton}
          />

          <CustomButton
            title='No, thank you'
            onPress={handleNoClick}
            text
            buttonStyle={styles.noButton}
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
    justifyContent: 'flex-end',
  },
  wrapper: {
    justifyContent: 'space-between',
    height: '83%'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: "ClashGrotesk-Semibold",
    marginTop: 20,
    marginBottom: 8,
  },
  instruction: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 21,
  },
  instruction2: {
    textAlign: 'center',
    lineHeight: 21,
  },
  yesButton: {
    height: 58,
    marginTop: 'auto',
    marginBottom: 1,
  },
  noButton: {
    height: 58,
    marginBottom: 15,
  },
});

export default BVNConfirmationScreen;
