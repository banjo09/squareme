import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { Colors } from '../utils/colors';
import { Text } from '../theme/CustomText';
import PinInput from '../components/PinInput';
import CustomButton from '../components/CustomButton';
import { PaymentStackParamList, SendSquaremeTagRouteProp } from '../types/payment.navigation';
import CustomTextInput from '../components/CustomTextInput';

type SendSquaremeTagParams = {
  Amount: number;
};

const SendSquaremeTagScreen = () => {
  const [tag, setTag] = useState('');
  const [amt, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');

  const route = useRoute<SendSquaremeTagRouteProp>();
  const navigation = useNavigation<StackNavigationProp<PaymentStackParamList>>();

  const {
    Amount: amount,
  } = route.params as unknown as SendSquaremeTagParams;

  useEffect(() => {
    setAmount(amount.toString())
  }, [amount])

  const handleVerify = () => {
    navigation.navigate('ConfirmTransaction', {
      Amount: amount,
      Beneficiary: tag,
    } as unknown as undefined);
  };

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
          <Text style={styles.title}>Send</Text>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.bvnText}>
            Enter Squareme tag
          </Text>
          <CustomTextInput
            value={tag}
            onChangeText={setTag}
            leftIcon={<Feather name="at-sign" size={16} color="#70747E" />}
          />
          {
            tag && <CustomButton
              title={tag}
              onPress={() => { }}
              mode='filled'
              buttonStyle={styles.tagButton}
              textStyle={styles.tagText}
            />
          }
        </View>
        <View style={styles.inputView}>
          <Text style={styles.bvnText}>
            Purpose for sending (Optional)
          </Text>
          <CustomTextInput
            value={purpose}
            onChangeText={setPurpose}
          // containerStyle={styles.inputContainer}
          />

        </View>
        <View style={styles.inputView}>
          <Text style={styles.bvnText}>
            Amount
          </Text>
          <CustomTextInput
            value={amt}
            onChangeText={setAmount}
            keyboardType='numeric'
            leftIcon={<Text style={styles.iconText}>₦</Text>}
          />

        </View>

        <CustomButton
          key={amt}
          title="Send Money"
          onPress={handleVerify}
          mode='filled'
          buttonStyle={[
            styles.verifyButton,
            (!amt || !tag) && styles.verifyButtonDisabled,
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
    marginBottom: 25,
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
  inputView: {
    marginBottom: 20,
  },
  iconText: {
    color: Colors.label,
    fontSize: 16.67,
    fontFamily: "ClashGrotesk-Variable",
    textTransform: 'uppercase'
  },
  verifyButton: {
    height: 58,
    marginTop: 'auto',
    marginBottom: 60,
  },
  tagButton: {
    height: 50,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#ECFDF3',
    borderColor: '#12B76A'
  },
  tagText: {
    color: Colors.black,
    fontSize: 15,
    flex: 1,
    textTransform: 'uppercase'
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

export default SendSquaremeTagScreen;
