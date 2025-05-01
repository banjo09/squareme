import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import ActionItem from '../components/payment/ActionItem';
import TransactionItem from '../components/payment/TransactionItem';
import { Text } from '../theme/CustomText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';


const recentTransactions = [
  {
    id: '1',
    title: 'Withdrawal to Bank',
    description: '0095649856 GIFT OLUWAS......',
    amount: '₦30,000.00',
  },
];

const PaymentsScreen = () => {
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const handleSendMoney = () => {
    console.log('Send money pressed');
    // Navigate to send money screen
  };

  const handleRequestMoney = () => {
    console.log('Request money pressed');
    // Navigate to request money screen
  };

  const handleSeeMore = () => {
    console.log('See more pressed');
    // Navigate to transactions screen
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
        {recentTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            title={transaction.title}
            description={transaction.description}
            amount={transaction.amount}
          />
        ))}
        <TouchableOpacity style={styles.seeMoreButton} onPress={handleSeeMore}>
          <Text style={styles.seeMoreText}>See more {'>'}</Text>
        </TouchableOpacity>
        <Pressable
          style={styles.seeMoreButton}
          onPress={handleSeeMore}
        >
          <Text style={styles.seeMoreText}>
            {/* {showAllTransactions ? 'See less' : 'See more'} */}
            {'See more'}
          </Text>
          <MaterialIcons
            name={showAllTransactions ? "chevron-right" : 'keyboard-arrow-down'}
            size={18}
            color='#70747E'
          />
        </Pressable>
      </View>

      <View style={styles.referralSection}>
        <Text style={styles.referralTitle}>Refer your friends and earn rewards</Text>
        <Text style={styles.referralDescription}>
          Refer your friends using your username/tag and earn rewards on each referral
        </Text>
        <TouchableOpacity style={styles.copyButton} onPress={handleCopyReferralCode}>
          <Text style={styles.copyButtonText}>Copy referral code</Text>
        </TouchableOpacity>
      </View>
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
  },
  seeMoreText: {
    color: '#0066FF',
    fontSize: 14,
    fontWeight: '600',
  },
  referralSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  referralTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  referralDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  copyButton: {
    backgroundColor: '#F0F5FF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#0066FF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PaymentsScreen;