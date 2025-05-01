import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Image,
  Keyboard,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BlurView } from '@react-native-community/blur';
import { PaymentCategory, Send_RequestNavigationProp, Send_RequestRouteProp } from '../types/payment.navigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../utils/colors';

const destinations = [
  { id: 'bank', label: 'Send to bank account' },
  { id: 'beneficiary', label: 'Send to a beneficiary' },
  { id: 'tag', label: 'Send using Squareme tag' },
  { id: 'contact', label: 'Send to contact list' },
];


type Send_RequestParams = {
  Category: PaymentCategory;
};

const Send_Request_Screen = () => {
  const [amount, setAmount] = useState('');
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);


  const route = useRoute<Send_RequestRouteProp>();
  const navigation = useNavigation<Send_RequestNavigationProp>();

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
    console.log(`Sending ${amount} to ${selectedDestination}`);
    // Navigate to next screen or process payment
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
          Where do you want to send money?
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

      <Modal
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
      </Modal>
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
    marginBottom: 20,
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
    // paddingBottom: 5,
    // alignSelf: 'center',
    // marginRight: 4,
  },

  // amountInput: {
  //   flex: 1,
  //   fontSize: 18,
  //   color: '#000',
  // },

  amountInput: {
    // flex: 0.5,
    fontSize: 55,
    color: Colors.white,
    // marginLeft: 20,
    // paddingLeft: 20,
    // fontFamily: 'ClashGrotesk-Bold',
    textAlign: 'center',
    // marginVertical: 20,
  },

  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numberButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  numberText: {
    fontSize: 24,
    color: '#BDBDBD',
  },
  proceedButton: {
    backgroundColor: '#0066FF',
    // backgroundColor: Colors.red,
    padding: 16,
    borderRadius: 10,
    // marginTop: 30,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
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