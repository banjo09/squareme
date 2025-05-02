import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { Colors } from '../utils/colors';
import { Text } from '../theme/CustomText';
import PinInput from '../components/PinInput';
import CustomButton from '../components/CustomButton';
import { ConfirmTransactionNavigationProp, ConfirmTransactionRootNavigationProp, ConfirmTransactionRouteProp, PaymentStackParamList } from '../types/payment.navigation';

type ConfirmTransactionParams = {
  Amount: number;
  Beneficiary: string
};

const ConfirmTransactionScreen = () => {

  const route = useRoute<ConfirmTransactionRouteProp>();
  // const navigation = useNavigation<StackNavigationProp<PaymentStackParamList>>();
  const navigation = useNavigation<ConfirmTransactionRootNavigationProp>();
  // type ConfirmTransactionNavigationProp = StackNavigationProp<
  //   PaymentStackParamList,
  //   'ConfirmTransaction'
  // >;

  const {
    Amount: amount,
    Beneficiary: beneficiary
  } = route.params as unknown as ConfirmTransactionParams;

  const handleConfirm = () => {
    // console.log('Verifying code:', pin);
    navigation.navigate('SecurityPin', {
      label: 'Enter your Security PIN',
      newScreenFlow: 'Success',
      params: {
        message: 'Transaction Successful!',
        description: `You have successfully sent  NGN ${amount} to ${beneficiary}. The recipient should get an alert shortly`,
        nextAction: {
          label: 'Done',
          screen: 'MainApp',
          params: {
            screen: 'Payments',
            params: {
              screen: 'PaymentsScreen',
              params: {},
            },
          }
        }
      }
    } as unknown as undefined);
  };
  // navigation.navigate('TabNavigatorScreen', {
  //   screen: 'Payments',
  //   params: {
  //     screen: 'PaymentsScreen',
  //     params: {},
  //   },
  // });


  const handleBackClick = () => {
    navigation.goBack()
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
          <Text style={styles.title}>Confirm Transaction</Text>
        </View>

        <Text style={styles.instruction}>
          Please confirm the details before you proceed as your money cannot be reversed once processed.
        </Text>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Amount</Text>
          <Text style={styles.balanceAmount}>NGN{amount}</Text>
        </View>

        <View style={styles.beneficiaryContainer}>
          <View style={styles.beneficiaryRow}>
            <Text style={styles.beneficiaryLabel}>Beneficiary Number:</Text>
            <Text style={styles.beneficiaryAmount}>0800000000</Text>
          </View>
          <View style={styles.border} />
          <View style={styles.beneficiaryRow}>
            <Text style={styles.beneficiaryLabel}>Beneficiary:</Text>
            <Text style={styles.beneficiaryAmount}>{beneficiary}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Cancel"
            onPress={handleBackClick}
            buttonStyle={styles.verifyButton}
          />
          <CustomButton
            title="Confirm"
            onPress={handleConfirm}
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
    marginBottom: 30,
  },
  balanceContainer: {
    marginTop: 30,
    marginBottom: 30,
    // alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 15,
    borderRadius: 8,
  },
  balanceLabel: {
    fontSize: 15,
    fontFamily: 'ClashGrotesk-Medium',
    color: Colors.white,
  },
  balanceAmount: {
    fontSize: 24,
    fontFamily: 'ClashGrotesk-Medium',
    color: Colors.white,
    lineHeight: 40,
  },
  beneficiaryContainer: {
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: Colors.lighter,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 8,
    borderColor: '#EFEFF1',
    borderWidth: 1
  },
  beneficiaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15
  },
  beneficiaryLabel: {
    fontSize: 15,
    color: Colors.label,
  },
  beneficiaryAmount: {
    fontSize: 15,
    color: Colors.primary,
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
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFF1',
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

export default ConfirmTransactionScreen;
