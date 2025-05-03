import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import BillItem from '../components/Home/BillItem';

const menuItems = [
  {
    id: '1',
    title: 'Bill Payments',
    description: 'Pay all your bills on squareme',
    image: require('../assets/receipt.png'),
    background: '#ECF3FE',
  },
  {
    id: '2',
    title: 'Squareme POT',
    description: 'Lock your funds away and earn interests',
    image: require('../assets/strongbox.png'),
    background: '#EEEEFF',
  },
  {
    id: '3',
    title: 'Gift cards',
    description: 'Select from your list of beneficiaries',
    image: require('../assets/lightbulb.png'),
    background: '#FFF2E5',
  },
  {
    id: '4',
    title: 'Cards',
    description: 'Virtual and physical debit cards',
    image: require('../assets/card.png'),
    background: '#F6EBFE',
  },
  {
    id: '5',
    title: 'Marketplace',
    description: 'Find your favourite Fundr vendors for easy payments',
    image: require('../assets/lamp-charge.png'),
    background: '#edf5f8',
  },
];


const MoreScreen = () => {

  const handleMenuItemPress = (id: string) => {
    console.log(`Menu item ${id} pressed`);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>More</Text>

        {menuItems.map((item, index) => (
          <BillItem
            key={item.id}
            title={item.title}
            description={item.description}
            onPress={() => handleMenuItemPress(item.id)}
            image={item.image}
            background={item.background}
            lastItem={menuItems.length - 1 == index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
  },
  scrollContainer: {
    padding: 18,
    paddingBottom: 10,
  },
  header: {
    marginBottom: 24,
    fontSize: 20,
    fontFamily: "ClashGrotesk-Medium",
  },
  iconText: {
    fontSize: 20,
  },
});

export default MoreScreen;