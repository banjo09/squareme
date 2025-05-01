import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  ImageBackground,
} from 'react-native';
import ActionItem from '../components/payment/ActionItem';
import TransactionItem from '../components/payment/TransactionItem';
import { Text } from '../theme/CustomText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../utils/colors';
import { PaymentsNavigationProp } from '../types/payment.navigation';
import { useNavigation } from '@react-navigation/native';


const recentTransactions = [
  {
    id: '1',
    title: 'Withdrawal to Bank',
    description: '0095649856 GIFT OLUWAS......',
    amount: '₦30,000.00',
  },
  {
    id: '2',
    title: 'Send to Client',
    description: '0093339111 CHIOMA LOVE......',
    amount: '₦99,000.00',
  },
];

const PaymentsScreen = () => {
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const displayedTransactions = showAllTransactions ? recentTransactions : recentTransactions.slice(0, 1);

  const navigation = useNavigation<PaymentsNavigationProp>();

  const handleSendMoney = () => {
    navigation.navigate('Send_Request', {
      Category: 'send',
    } as never);
  };

  const handleRequestMoney = () => {
    navigation.navigate('Send_Request', {
      Category: 'request',
    } as never);
  };

  const handleSeeMore = () => {
    console.log('See more pressed');
    setShowAllTransactions((show) => !show)
  };

  const handleCopyReferralCode = () => {
    console.log('Copy referral code pressed');
    // Copy referral code to clipboard
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>Payments</Text>

      <ActionItem
        title="Send Money"
        description="Send money to anyone instantly"
        onPress={handleSendMoney}
        // icon={<Text style={styles.iconText}>💸</Text>}
        icon="arrow-forward"
        background='#F1F5FD'
        color='#3976E8'

      />
      <ActionItem
        title="Request Money"
        description="Request money from your friends and family"
        onPress={handleRequestMoney}
        icon='arrow-back'
        background='#F2FAEB'
        color='#4B7F1E'
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent transactions</Text>
        {displayedTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            title={transaction.title}
            description={transaction.description}
            amount={transaction.amount}
          />
        ))}
        <Pressable
          style={styles.seeMoreButton}
          onPress={handleSeeMore}
        >
          <Text style={styles.seeMoreText}>
            {showAllTransactions ? 'See less' : 'See more'}
          </Text>
          <MaterialIcons
            name={showAllTransactions ? "chevron-right" : 'keyboard-arrow-down'}
            size={18}
            color='#70747E'
          />
        </Pressable>
      </View>

      <ImageBackground
        style={styles.referralSection}
        source={require('../assets/vectorBackground.png')}
      >
        <View style={styles.referralContainer}>
          <View
            style={styles.textContainer}
          >
            <Text style={styles.referralTitle}>
              Refer your friends and earn rewards
            </Text>
            <Text style={styles.referralDescription}>
              Refer your friends using your username/tag and earn rewards on each referral
            </Text>
          </View>
          <Image
            source={require('../assets/vector.png')}
            style={styles.vector}
          />
        </View>
        <TouchableOpacity style={styles.copyButton} onPress={handleCopyReferralCode}>
          <Text style={styles.copyButtonText}>Copy referral code</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    fontSize: 20,
    fontFamily: 'ClashGrotesk-Medium',
    color: '#333',
    marginBottom: 40,
    marginTop: 10
  },
  iconText: {
    fontSize: 20,
  },
  section: {
    marginTop: 8,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'ClashGrotesk-Medium',
    color: '#656565',
    marginBottom: 16,
  },
  seeMoreButton: {
    alignSelf: 'center',
    marginTop: 8,

    borderRadius: 12,
    borderColor: '#E4E9F2',
    borderWidth: 1,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeMoreText: {
    color: '#70747E',
    fontFamily: 'ClashGrotesk-Medium',
  },
  referralSection: {
    backgroundColor: '#172242',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 16,
    paddingTop: 20
  },
  referralTitle: {
    fontSize: 17,
    fontFamily: 'ClashGrotesk-Semibold',
    color: Colors.white,
    marginBottom: 17,
  },
  referralDescription: {
    fontSize: 12,
    color: Colors.white,
    marginBottom: 16,
    lineHeight: 20,
  },
  copyButton: {
    backgroundColor: '#F0F5FF',
    borderRadius: 8,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100
  },
  copyButtonText: {
    color: '#2E3A59',
    fontSize: 10,
    fontFamily: 'ClashGrotesk-Medium',
  },
  vector: {
    width: 85,
    height: 85,
    // alignSelf: 'center',
  },
  referralContainer: {
    flexDirection: 'row'
  },
  textContainer: {
    width: '80%'
  }
});

export default PaymentsScreen;