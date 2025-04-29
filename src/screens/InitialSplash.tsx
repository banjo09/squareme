import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';

const HomeScreen = () => {
  // Sample data for the carousel images
  const carouselImages = [
    require('../assets/caro1.png'),
    require('../assets/caro2.png'),
    require('../assets/caro3.png'),
    require('../assets/caro1.png'),
  ];

  // Sample transaction data
  const transactions = [
    { id: '1', name: 'Transfer to John Williams', date: 'August 07, 06:03 AM', amount: 'NGN 5000', status: 'Successful' },
    { id: '2', name: 'Transfer to Sarah Johnson', date: 'August 06, 02:15 PM', amount: 'NGN 10000', status: 'Successful' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const carouselRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % carouselImages.length;
      setCurrentIndex(nextIndex);
      carouselRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderCarouselItem = ({ item }: { item: any }) => (
    <View style={styles.carouselItem}>
      <Image source={item} style={styles.carouselImage} resizeMode="contain" />
    </View>
  );

  const renderIndicator = (index: number) => {
    const opacity = scrollX.interpolate({
      inputRange: [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ],
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        key={index}
        style={[styles.indicator, { opacity }]}
      />
    );
  };

  const { width } = Dimensions.get('window');

  return (
    <ScrollView style={styles.container}>
      {/* Carousel Section */}
      <View style={styles.carouselContainer}>
        <FlatList
          ref={carouselRef}
          data={carouselImages}
          renderItem={renderCarouselItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(
              e.nativeEvent.contentOffset.x / width
            );
            setCurrentIndex(newIndex);
          }}
          keyExtractor={(_, index) => index.toString()}
        />

        <View style={styles.indicatorContainer}>
          {carouselImages.map((_, index) => renderIndicator(index))}
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {transactions.map((txn) => (
          <View key={txn.id} style={styles.transactionItem}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionName}>{txn.name}</Text>
              <Text style={styles.transactionDate}>{txn.date}</Text>
            </View>
            <View style={styles.transactionAmount}>
              <Text style={styles.amountText}>{txn.amount}</Text>
              <Text style={styles.statusText}>{txn.status}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Wallet Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Wallet Balance 💸</Text>
        <Text style={styles.balanceAmount}>NGN 500,000.00</Text>
        <Text style={styles.bankInfo}>Providus Bank / 123458979</Text>
        <Text style={styles.tag}>Squarerne tag: @davidokoye22</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Fund Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Pay Bills</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Cards</Text>
        </TouchableOpacity>
      </View>

      {/* Marketing Text */}
      <View style={styles.marketingSection}>
        <Text style={styles.marketingText}>Spend your money easily without any complications</Text>
        <Text style={styles.marketingText}>Receive funds sent to you in seconds.</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Create an account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    height: 200,
    marginBottom: 20,
  },
  carouselItem: {
    width: Dimensions.get('window').width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '90%',
    height: '90%',
    borderRadius: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginHorizontal: 5,
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionInfo: {
    flex: 2,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  transactionAmount: {
    flex: 1,
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 12,
    color: 'green',
    marginTop: 5,
  },
  balanceContainer: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    marginVertical: 10,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  bankInfo: {
    fontSize: 14,
    color: '#666',
  },
  tag: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  actionButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    width: '23%',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    textAlign: 'center',
  },
  marketingSection: {
    padding: 20,
    alignItems: 'center',
  },
  marketingText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    padding: 20,
  },
  primaryButton: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#0066cc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#0066cc',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;