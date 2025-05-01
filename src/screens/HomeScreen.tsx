import React, { useRef, useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../utils/colors';
import { Text } from '../theme/CustomText';
import AnimatedBox from '../components/AnimatedBox';


const quickActions = [
  { id: '1', icon: require('../assets/fund.png'), name: 'Fund Wallet' },
  { id: '2', icon: require('../assets/wallet-minus.png'), name: 'Withdraw' },
  { id: '3', icon: require('../assets/receipt.png'), name: 'Pay Ellis' },
  { id: '4', icon: require('../assets/card.png'), name: 'Cards' },
  { id: '5', icon: require('../assets/strongbox.png'), name: 'Squareme Pot' },
  { id: '6', icon: require('../assets/mobile.png'), name: 'Airtime' },
  { id: '7', icon: require('../assets/wifi.png'), name: 'Data' },
  { id: '8', icon: require('../assets/monitor.png'), name: 'Cable TV' },
  { id: '9', icon: require('../assets/lamp-charge.png'), name: 'Utility' },
];

const transactions = [
  {
    id: '1',
    type: 'Withdrawal to bank',
    amount: '-NGN 5000',
    date: 'August 07, 06:03 AM',
    status: 'Successful',
    icon: require('../assets/solid_money-bills.png')
  },
  {
    id: '2',
    type: 'Deposit',
    amount: '+NGN 5000',
    date: 'August 07, 06:03 AM',
    status: 'Failed',
    icon: require('../assets/solid_money-bills.png')
  },
];

const suggestedActions = [
  {
    id: '1',
    title: 'Earn up to 14% interest on your locked funds',
    color: Colors.lighter,
    image: require('../assets/piggy-bank.png')
  },
  {
    id: '2',
    title: 'Speed up your bills payments',
    color: '#D7E5FF',
    image: require('../assets/half.png')
  },
];

const HomeScreen = () => {
  const [showFullBalance, setShowFullBalance] = useState(false);
  const [showAllQuickActions, setShowAllQuickActions] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const displayedQuickActions = showAllQuickActions ? quickActions : quickActions.slice(0, 5);
  const displayedTransactions = showAllTransactions ? transactions : transactions.slice(0, 1);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[
          'rgb(206, 236, 244)',
          'rgb(224, 238, 243)',
          'rgb(224, 233, 235)',
          'rgb(232, 240, 242)',
          '#ffffff'
        ]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.linearContainer}
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
                size={24}
                color={Colors.taintedBlack}
              />
              <View style={styles.notificationBadgeRight} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.walletCard}>
          <Pressable style={styles.transactionHistoryButton}>
            <Text style={styles.transactionHistoryText}>Transaction History</Text>
            <MaterialIcons name="chevron-right" size={20} color="#fff" />
          </Pressable>

          <TouchableOpacity
            onPress={() => setShowFullBalance(!showFullBalance)}
            style={styles.balanceSection}
          >
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>Wallet Balance</Text>
              <Feather
                name={showFullBalance ? 'eye-off' : 'eye'}
                size={14}
                color="#fff"
                style={styles.eyeIcon}
              />
            </View>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceAmount}>
                {showFullBalance ? 'NGN 500,000.00' : 'NGN ************'}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.tagSection}>
            <Text style={styles.tagText}>Squareme tag: @davidoloye22</Text>
            <MaterialIcons name="content-copy" size={16} color={Colors.purple} />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Pressable
            onPress={() => setShowAllQuickActions((show) => !show)}
          >
            <Text style={styles.seeMoreText}>
              {showAllQuickActions ? 'See less' : 'See more'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.quickActionsContainer}>
          {displayedQuickActions.map((action) => {
            return (
              <AnimatedBox
                key={action.id}
                action={action}
              />
            )
          })}
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
                <Image
                  source={transaction.icon}
                  style={{
                    width: 42,
                    height: 45,
                    resizeMode: 'contain',
                  }}
                />
              </View>

              <View style={styles.transactionDetails}>
                <Text style={styles.transactionType}>{transaction.type}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>

              <View style={styles.transactionAmountContainer}>
                <Text style={[
                  styles.transactionAmount,
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
            onPress={() => setShowAllTransactions((show) => !show)}
          >
            <Text style={styles.seeMoreTransactionsText}>
              {showAllTransactions ? 'See less' : 'See more'}
            </Text>
            <MaterialIcons
              name={showAllTransactions ? "chevron-right" : 'keyboard-arrow-down'}
              size={18}
              color={Colors.purple}
            />
          </Pressable>
        </View>
      </View>

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
                source={item.image}
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
    backgroundColor: '#FFFFFF',
    // paddingHorizontal: 18,
  },
  linearContainer: {
    paddingTop: 48,
    marginBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 18,
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
    paddingHorizontal: 16,
    elevation: 3,
    marginHorizontal: 18,
  },
  transactionHistoryButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#000942',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  transactionHistoryText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 5,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  balanceSection: {
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center'
  },
  balanceLabel: {
    color: '#fff',
    fontSize: 14,
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
    marginLeft: 5
  },
  tagSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000942',
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
    paddingHorizontal: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'ClashGrotesk-Medium',
  },
  seeMoreText: {
    color: Colors.purple,
    fontSize: 14,
    fontFamily: 'ClashGrotesk-Medium',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: 70,
    height: 70,
    borderRadius: 6.8,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: Colors.lighter,
  },
  quickActionIcon: {
    // width: 50,
    // height: 50,
    borderRadius: 25,
    // backgroundColor: '#E8F5E9',
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
    elevation: 1,
    position: 'relative'
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 15,
    marginBottom: 7,
  },
  transactionDate: {
    fontSize: 13,
    color: '#70747E',
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
    borderRadius: 12,
    borderColor: '#E4E9F2',
    borderWidth: 1,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: -15,
    alignSelf: 'center'
  },
  seeMoreTransactionsText: {
    fontSize: 13,
    color: Colors.purple,
    fontFamily: 'ClashGrotesk-Medium',
  },
  suggestedActionsContainer: {
    paddingVertical: 5,
  },
  suggestedActionCard: {
    width: 270,
    height: 250,
    borderRadius: 16,
    padding: 24,
    marginRight: 15,
    flexDirection: 'column',
    alignItems: 'center'
  },
  suggestedActionText: {
    fontSize: 16,
    fontFamily: 'ClashGrotesk-Medium',
    marginBottom: 10,
    lineHeight: 24,
    color: '#2E3A59'
  },
  suggestedActionIcon: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});

export default HomeScreen;