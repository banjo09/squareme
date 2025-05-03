import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, SuccessScreenNavigationProp, SuccessScreenRouteProp, VerifyCodeScreenRouteProp } from '../types/navigation';
import { Text } from '../theme/CustomText';
import CustomButton from '../components/CustomButton';

const { width } = Dimensions.get('window');
type SuccessParams = {
  section: string;
  message: string;
  description: string;
  nextAction?: {
    label: string;
    screen: keyof RootStackParamList;
    params?: object;
  };
};

const SuccessScreen = () => {
  const route = useRoute<SuccessScreenRouteProp>();
  const navigation = useNavigation<SuccessScreenNavigationProp>();

  const {
    section,
    message,
    description,
    nextAction,
  } = route.params as unknown as SuccessParams;

  const handleNext = () => {
    if (nextAction?.screen) {
      navigation.navigate(nextAction.screen, nextAction.params as never);
    }
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
              source={
                section === 'Payments' ?
                  require('../assets/paymentsLogo.png') :
                  require('../assets/success.png')
              }
              style={{
                width: width * 0.8,
                height: 140,
                resizeMode: 'contain',
              }}
            />

            <Text style={styles.subtitle}>{message}</Text>
            <Text style={styles.instruction}>
              {description}
            </Text>
          </View>

          {nextAction && (
            <CustomButton
              title={nextAction.label}
              onPress={handleNext}
              mode='filled'
              buttonStyle={styles.verifyButton}
            />
          )}

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
    height: '70%'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: "ClashGrotesk-Medium",
    marginTop: 20,
    marginBottom: 8,
  },
  instruction: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  verifyButton: {
    height: 58,
    marginTop: 'auto',
    marginBottom: 60,
  },
});

export default SuccessScreen;
