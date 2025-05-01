import React, { FC, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SectionHeader from './SectionHeader';
import BillItem from './BillItem';
import { Colors } from '../../utils/colors';
import { Text } from '../../theme/CustomText';

interface BillPaymentsModalProps {
  visible: boolean;
  onClose: () => void;
  tabBarHeight?: number;
}

const BillPaymentsModal: FC<BillPaymentsModalProps> = ({
  visible,
  onClose,
  tabBarHeight
}) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    'electricity': true,
  });

  const toggleItem = (id: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
      backdropColor='rgba(0, 0, 0, 0.35)'
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Feather
            name='x-circle'
            size={24}
            color={Colors.activeTint}
            onPress={onClose}
          />
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingBottom: tabBarHeight ? tabBarHeight - 10 : 20 }
          ]}
        >
          <SectionHeader title="Bill Payments" />
          <View style={styles.section}>
            <BillItem
              title="Buy airtime"
              description="Pay all your bills on squareme"
              // checked={!!selectedItems['airtime']}
              onPress={() => toggleItem('airtime')}
              image={require('../../assets/mobile.png')}
              background='#ECF3FE'
            />
            <BillItem
              title="Purchase electricity units"
              description="Stay connected by purchasing electricity units"
              // checked={!!selectedItems['electricity']}
              onPress={() => toggleItem('electricity')}
              image={require('../../assets/lightbulb.png')}
              background='#FFF2E5'
            />
            <BillItem
              title="Subscribe your Cable TV"
              description="Subscribe now for nonstop entertainment"
              // checked={!!selectedItems['cable']}
              onPress={() => toggleItem('cable')}
              image={require('../../assets/monitor.png')}
              background='#fbe7fd'
              lastItem
            />
          </View>

          <SectionHeader title="Cards" />
          <View style={styles.section}>
            <BillItem
              title="Top up your virtual card"
              description="Avoid failed transactions by topping up your card"
              // checked={!!selectedItems['topup']}
              onPress={() => toggleItem('topup')}
              image={require('../../assets/card.png')}
              background='#F6EBFE'
            />
            <BillItem
              title="Request a delivery address"
              description="Request an address to enable you shop like a local"
              // checked={!!selectedItems['address']}
              onPress={() => toggleItem('address')}
              image={require('../../assets/lamp-charge.png')}
              background='#edf5f8'
              lastItem
            />
          </View>

          <SectionHeader title="Savings & Investment" />
          <View style={styles.section}>
            <BillItem
              title="Create POT"
              description="Earn up to 14% interest on locked funds"
              // checked={!!selectedItems['address']}
              onPress={() => toggleItem('address')}
              image={require('../../assets/strongbox.png')}
              background='#EEEEFF'
              lastItem
            />
            {/* <Text style={styles.potTitle}>Create POT</Text>
            <Text style={styles.potDescription}>Earn up to 14% interest on locked funds</Text> */}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.screen,
    marginTop: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  content: {
    padding: 16,
    // paddingBottom: 190,
  },
});

export default BillPaymentsModal;