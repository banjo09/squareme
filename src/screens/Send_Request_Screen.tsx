import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BottomTabNavigationOptions, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { PaymentCategory, PaymentStackParamList, Send_RequestNavigationProp, Send_RequestRouteProp } from '../types/payment.navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../utils/colors';
import DestinationModal from '../components/payment/DestinationModal';

type destinationType = {
  id: string;
  label: string;
  loc: keyof PaymentStackParamList;
}
const sendDestinations: destinationType[] = [
  { id: 'bank', label: 'Send to bank account', loc: 'Send_SquaremeTag' },
  { id: 'beneficiary', label: 'Send to a beneficiary', loc: 'Send_Beneficiaries' },
  { id: 'tag', label: 'Send using Squareme tag', loc: 'Send_SquaremeTag' },
  { id: 'contact', label: 'Send to contact list', loc: 'Send_ContactList' },
];

const requestDestinations: destinationType[] = [
  { id: 'beneficiary', label: 'Request from a beneficiary', loc: 'Request_Beneficiaries' },
  { id: 'tag', label: 'Request using Squareme tag', loc: 'Request_SquaremeTag' },
  { id: 'contact', label: 'Request from contact list', loc: 'Request_ContactList' },
];

const { width, height } = Dimensions.get('window');

type Send_RequestParams = {
  Category: PaymentCategory;
};

const Send_Request_Screen = () => {
  const [amount, setAmount] = useState('');
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);


  const route = useRoute<Send_RequestRouteProp>();
  const navigation = useNavigation<Send_RequestNavigationProp>();
  const tabBarHeight = useBottomTabBarHeight();

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: '#0D0F1B',
          borderColor: '#0D0F1B',
        },
      } as BottomTabNavigationOptions);

      return () => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
          },
        } as BottomTabNavigationOptions);
      };
    }, [])
  );

  const {
    Category,
  } = route.params as unknown as Send_RequestParams;

  // const handleNext = () => {
  //   if (nextAction?.screen) {
  //     navigation.navigate(nextAction.screen, nextAction.params as never);
  //   }
  // };

  const handleNumberPress = (value: string) => {
    if (value === '<') {
      setAmount(prev => prev.slice(0, -1));
    } else if (value === '.' && !amount.includes('.')) {
      setAmount(prev => prev + value);
    } else if (value !== '.') {
      setAmount(prev => prev + value);
    }
  };

  const handleDestinationSelect = (id: string) => {
    setSelectedDestination(id);
    setShowDestinationModal(false);
  };

  const handleProceed = () => {
    if (!amount || !selectedDestination) {
      Alert.alert('Please enter amount and select destination');
      return;
    }
    const destinationScreen = Category == 'send'
      ? sendDestinations.find(d => d.id === selectedDestination)?.loc
      : requestDestinations.find(d => d.id === selectedDestination)?.loc

    navigation.navigate(destinationScreen as keyof PaymentStackParamList, {
      Amount: amount,
    } as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Wallet Balance</Text>
        <Text style={styles.balanceAmount}>₦5,200</Text>
      </View>

      <TouchableOpacity
        style={styles.destinationButton}
        onPress={() => setShowDestinationModal(true)}
      >
        <Text style={styles.destinationButtonText}>
          {/* {
            Category == 'send' ? 'Where do you want to send money?'
              : 'Who do you want to request from?'
          } */}
          {
            selectedDestination && Category == 'send'
              ? sendDestinations.find(d => d.id === selectedDestination)?.label
              : selectedDestination && Category == 'request'
                ? requestDestinations.find(d => d.id === selectedDestination)?.label
                : !selectedDestination && Category == 'send' ? 'Where do you want to send money?'
                  : 'Who do you want to request from?'
          }
        </Text>
        <MaterialIcons
          name='keyboard-arrow-down'
          size={20}
          color={Colors.white}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity
  style={styles.destinationButton}
  onPress={() => setShowDestinationModal(true)}
>
  <Text style={styles.destinationButtonText}>
    {selectedDestination
      ? destinations.find(d => d.id === selectedDestination)?.label
      : 'Where do you want to send money?'}
  </Text>
</TouchableOpacity> */}

      <View style={styles.amountInputContainer}>
        <Text style={styles.nairaIcon}>₦</Text>
        <TextInput
          style={styles.amountInput}
          value={amount ? amount.toString() : '0'}
          onChangeText={setAmount}
          keyboardType="numeric"
          editable={false}
          placeholder="0"
        />
      </View>

      <View style={styles.numberPad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '<'].map((num) => (
          <TouchableOpacity
            key={num}
            style={styles.numberButton}
            onPress={() => handleNumberPress(num)}
          >
            <Text style={styles.numberText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.proceedButton}
        onPress={handleProceed}
      >
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>

      <DestinationModal
        visible={showDestinationModal}
        onClose={() => setShowDestinationModal(false)}
        tabBarHeight={tabBarHeight}
        destinations={Category == 'send' ? sendDestinations : requestDestinations}
        handleDestinationSelect={handleDestinationSelect}
        selectedDestination={selectedDestination}
        label={
          Category == 'send' ? 'Where do you want to send money?'
            : 'Who do you want to request from?'
        }
      />

      {/* <Modal
        visible={showDestinationModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDestinationModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowDestinationModal(false)}
        >
          <BlurView
            style={styles.blurView}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        </Pressable>

        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Where do you want to send money?</Text>

          {destinations.map((dest) => (
            <TouchableOpacity
              key={dest.id}
              style={styles.destinationOption}
              onPress={() => handleDestinationSelect(dest.id)}
            >
              <View style={styles.radioButton}>
                {selectedDestination === dest.id && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
              <Text style={styles.destinationText}>{dest.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0C26',
    padding: 20,
  },
  balanceContainer: {
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
    backgroundColor: 'rgba(159, 86, 212, 0.1)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  balanceLabel: {
    fontSize: 15,
    fontFamily: 'ClashGrotesk-Medium',
    color: '#B7BABF',
  },
  balanceAmount: {
    fontSize: 24,
    fontFamily: 'ClashGrotesk-Medium',
    color: Colors.white,
    lineHeight: 40,
  },
  destinationButton: {
    backgroundColor: '#38225A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  destinationButtonText: {
    fontSize: 15,
    color: Colors.white,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 3,
    justifyContent: 'space-between',
  },

  nairaIcon: {
    fontSize: 30,
    color: Colors.white,
  },

  amountInput: {
    fontSize: 55,
    color: Colors.white,
    textAlign: 'center',
  },

  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numberButton: {
    width: width * 0.23,
    height: width * 0.23,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  numberText: {
    fontSize: 24,
    color: '#BDBDBD',
  },
  proceedButton: {
    backgroundColor: '#4C525E',
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 8,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#FFF',
    fontSize: 15,
  },




  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  destinationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0066FF',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0066FF',
  },
  destinationText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Send_Request_Screen;