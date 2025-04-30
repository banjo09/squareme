import React, { useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../utils/colors';
import { Text } from '../theme/CustomText';


const quickActions = [
  { id: '1', icon: 'wallet', name: 'Fund Wallet' },
  { id: '2', icon: 'money-check', name: 'Withdraw' },
  { id: '3', icon: 'user', name: 'Pay Ellis' },
  { id: '4', icon: 'credit-card', name: 'Cards' },
  { id: '5', icon: 'piggy-bank', name: 'Squareme Pot' },
  { id: '6', icon: 'bus', name: 'Airtime' },
  { id: '7', icon: 'wifi', name: 'Data' },
  { id: '8', icon: 'tv', name: 'Cable TV' },
  { id: '9', icon: 'bolt', name: 'Utility' },
];

const transactions = [
  {
    id: '1',
    type: 'Withdrawal to bank',
    amount: '-NGN 5000',
    date: 'August 07, 06:03 AM',
    status: 'Successful',
    icon: 'arrow-up'
  },
  {
    id: '2',
    type: 'Deposit',
    amount: '+NGN 5000',
    date: 'August 07, 06:03 AM',
    status: 'Failed',
    icon: 'arrow-down'
  },
];

const suggestedActions = [
  {
    id: '1',
    title: 'Earn up to 14% interest on your locked funds',
    color: '#E1F5FE'
  },
  {
    id: '2',
    title: 'Speed up your payments',
    color: '#F1F8E9'
  },
];

const HomeScreen = () => {
  const [showFullBalance, setShowFullBalance] = useState(false);
  const [showAllQuickActions, setShowAllQuickActions] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const displayedQuickActions = showAllQuickActions ? quickActions : quickActions.slice(0, 5);
  const displayedTransactions = showAllTransactions ? transactions : transactions.slice(0, 2);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#00C6FB', '#FFFFFF']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image
              source={require('../assets/profile.png')}
              style={styles.avatar}
            />
            <View style={styles.greeting}>
              <Text style={styles.greetingText}>Hi David,</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconContainer}>
              <Ionicons name="gift-outline" size={18} color="#fff" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer}>
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.iconContainer, styles.notificationIcon]}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color={Colors.taintedBlack}
              />
              <View style={styles.notificationBadgeRight} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.walletCard}>
        <Pressable style={styles.transactionHistoryButton}>
          <Text style={styles.transactionHistoryText}>Transaction History</Text>
          <MaterialIcons name="chevron-right" size={20} color="#fff" />
        </Pressable>

        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Wallet Balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceAmount}>
              {showFullBalance ? 'NGN 500,000.00' : 'NGN ************'}
            </Text>
            <TouchableOpacity onPress={() => setShowFullBalance(!showFullBalance)}>
              <Feather
                name={showFullBalance ? 'eye-off' : 'eye'}
                size={20}
                color="#fff"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tagSection}>
          <Text style={styles.tagText}>Squareme tag: @davidoloye22</Text>
          <MaterialIcons name="content-copy" size={16} color="#fff" />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Pressable onPress={() => setShowAllQuickActions(!showAllQuickActions)}>
            <Text style={styles.seeMoreText}>
              {showAllQuickActions ? 'See less' : 'See more'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.quickActionsContainer}>
          {displayedQuickActions.map((action) => (
            <Pressable key={action.id} style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <FontAwesome name={action.icon} size={20} color="#4CAF50" />
              </View>
              <Text style={styles.quickActionText}>{action.name}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          <Pressable>
            <Text style={styles.seeMoreText}>View all</Text>
          </Pressable>
        </View>

        <View style={styles.transactionsCard}>
          {displayedTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <MaterialIcons
                  name={transaction.icon}
                  size={20}
                  color={transaction.status === 'Successful' ? '#4CAF50' : '#F44336'}
                />
              </View>

              <View style={styles.transactionDetails}>
                <Text style={styles.transactionType}>{transaction.type}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>

              <View style={styles.transactionAmountContainer}>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.amount.startsWith('+') ? '#4CAF50' : '#F44336' }
                ]}>
                  {transaction.amount}
                </Text>
                <Text style={[
                  styles.transactionStatus,
                  { color: transaction.status === 'Successful' ? '#4CAF50' : '#F44336' }
                ]}>
                  {transaction.status}
                </Text>
              </View>
            </View>
          ))}

          <Pressable
            style={styles.seeMoreTransactions}
            onPress={() => setShowAllTransactions(!showAllTransactions)}
          >
            <Text style={styles.seeMoreTransactionsText}>
              {showAllTransactions ? 'See less' : 'See more'}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Suggested Actions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suggested actions</Text>
        <FlatList
          horizontal
          data={suggestedActions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable style={[
              styles.suggestedActionCard,
              { backgroundColor: item.color }
            ]}>
              <Text style={styles.suggestedActionText}>{item.title}</Text>
              <Image
                source={require('../assets/piggy-bank.png')}
                style={styles.suggestedActionIcon}
              />
            </Pressable>
          )}
          contentContainerStyle={styles.suggestedActionsContainer}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 48,
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 20,
    marginRight: 10,
  },
  greeting: {
    justifyContent: 'center',
  },
  greetingText: {
    color: Colors.taintedBlack
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 18,
    backgroundColor: Colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 1,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F44336',
  },
  notificationBadgeRight: {
    position: 'absolute',
    top: 4,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F44336',
  },
  notificationIcon: {
    backgroundColor: 'transparent'
  },
  walletCard: {
    backgroundColor: Colors.accent,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  transactionHistoryButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  transactionHistoryText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 5,
  },
  balanceSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  eyeIcon: {
    opacity: 0.8,
  },
  tagSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingVertical: 8,
    borderRadius: 6,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  seeMoreText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: '19%',
    alignItems: 'center',
    marginBottom: 15,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  quickActionText: {
    fontSize: 12,
    textAlign: 'center',
  },
  transactionsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#757575',
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  transactionStatus: {
    fontSize: 12,
  },
  seeMoreTransactions: {
    paddingTop: 12,
    alignItems: 'center',
  },
  seeMoreTransactionsText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  suggestedActionsContainer: {
    paddingVertical: 5,
  },
  suggestedActionCard: {
    width: 200,
    height: 100,
    borderRadius: 12,
    padding: 16,
    marginRight: 15,
    justifyContent: 'center',
  },
  suggestedActionText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  suggestedActionIcon: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
  },
});

export default HomeScreen;