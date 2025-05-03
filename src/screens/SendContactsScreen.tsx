import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '../utils/colors';
import { Text } from '../theme/CustomText';
import CustomButton from '../components/CustomButton';
import { PaymentCategory, PaymentStackParamList, SendSquaremeTagRouteProp } from '../types/payment.navigation';
import CustomTextInput from '../components/CustomTextInput';

type SendSquaremeTagParams = {
  Amount: number;
  Category: PaymentCategory
};

const nigeriaFlag = (
  <Image
    source={require('../assets/flag.png')}
    style={{ width: 32, height: 32 }}
  />
);

const SendContactsScreen = () => {
  const [tag, setTag] = useState('');
  const [amt, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [toggle, setToggle] = useState(true);

  const route = useRoute<SendSquaremeTagRouteProp>();
  const navigation = useNavigation<StackNavigationProp<PaymentStackParamList>>();

  const {
    Amount: amount,
    Category
  } = route.params as unknown as SendSquaremeTagParams;

  useEffect(() => {
    setAmount(amount.toString())
  }, [amount])

  const handleVerify = () => {
    navigation.navigate('ConfirmTransaction', {
      Amount: amount,
      Beneficiary: tag,
      Category
    } as unknown as undefined);
  };

  const handleBackClick = () => {
    navigation.goBack()
  };

  const toggleSaveBeneficiary = () => setToggle((on) => !on)

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
          <Text style={styles.title}>
            {Category === 'send' ? 'Send' : 'Request'}
          </Text>
        </View>

        {Category === 'send' ? <>
          <View style={styles.inputView}>
            <Text style={styles.bvnText}>
              Enter Phone Number
            </Text>
            <CustomTextInput
              value={tag}
              onChangeText={setTag}
              keyboardType='phone-pad'
              leftIcon={nigeriaFlag}
              rightIcon={<Ionicons name="person-circle-outline" size={24} color={Colors.lightBlue} />}
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
        </> : <>
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
          <View style={styles.inputView}>
            <Text style={styles.bvnText}>
              Enter Phone Number
            </Text>
            <CustomTextInput
              value={tag}
              onChangeText={setTag}
              keyboardType='phone-pad'
              leftIcon={nigeriaFlag}
              rightIcon={<Ionicons name="person-circle-outline" size={24} color={Colors.lightBlue} />}
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
              Add a note (Optional)
            </Text>
            <CustomTextInput
              value={purpose}
              onChangeText={setPurpose}
            // containerStyle={styles.inputContainer}
            />

          </View>
        </>
        }

        <View style={styles.saveView}>
          <Text style={styles.saveText}>
            Save beneficiary?
          </Text>
          {
            toggle ? <MaterialCommunityIcons
              name="toggle-switch"
              size={50}
              color={Colors.purple}
              onPress={toggleSaveBeneficiary}
            /> : <MaterialCommunityIcons
              name="toggle-switch-off-outline"
              size={50}
              onPress={toggleSaveBeneficiary}
              color={Colors.purple}
            />
          }
        </View>

        <CustomButton
          key={amt}
          title={Category === 'send' ? "Send Money" : "Request Money"}
          onPress={handleVerify}
          mode='filled'
          buttonStyle={[
            styles.verifyButton,
            (!amt || !tag) && styles.verifyButtonDisabled,
          ]}
          disabled={!amt || !tag}
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
  saveText: {
    fontSize: 15,
    marginBottom: 8,
    color: Colors.black
  },
  inputView: {
    marginBottom: 20,
  },
  saveView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default SendContactsScreen;
