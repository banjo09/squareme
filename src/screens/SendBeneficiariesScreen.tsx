import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '../utils/colors';
import { getInitials } from '../utils/func';
import { Text } from '../theme/CustomText';
import CustomButton from '../components/CustomButton';
import { PaymentCategory, PaymentStackParamList, Send_BeneficiariesNavigationProp, Send_BeneficiariesRouteProp, SendSquaremeTagRouteProp } from '../types/payment.navigation';
import CustomTextInput from '../components/CustomTextInput';
import Card from '../components/payment/Card';

type beneficiariesType = {
  name: string;
  phone: string;
}

const recentBeneficiaries: beneficiariesType[] = [
  { name: 'Alice Johnson', phone: '08012345678' },
  { name: 'Bob Smith', phone: '08023456789' },
  { name: 'Charlie Davis', phone: '08034567890' },
  { name: 'Diane Clark', phone: '08045678901' },
  { name: 'Ethan Hall', phone: '08056789012' },
  { name: 'Fiona Adams', phone: '08067890123' },
  { name: 'George Baker', phone: '08078901234' },
];

const savedBeneficiaries: beneficiariesType[] = [
  { name: 'Helen Brooks', phone: '08112345678' },
  { name: 'Ian Carter', phone: '08123456789' },
  { name: 'Jenny Fisher', phone: '08134567890' },
  { name: 'Kyle Green', phone: '08145678901' },
  { name: 'Laura Hill', phone: '08156789012' },
  { name: 'Mike Irving', phone: '08167890123' },
  { name: 'Nina Johnson', phone: '08178901234' },
];

type SendBeneficiariesParams = {
  Amount: number;
  Category: PaymentCategory
};

const SendBeneficiariesScreen = () => {
  const [displayBeneficiaries, setDisplayBeneficiaries] = useState<beneficiariesType[]>(recentBeneficiaries);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'recent' | 'saved'>('recent');

  const route = useRoute<Send_BeneficiariesRouteProp>();
  const navigation = useNavigation<Send_BeneficiariesNavigationProp>();

  const {
    Amount: amount,
    Category
  } = route.params as unknown as SendBeneficiariesParams;

  const handleBeneficiaryClick = ({ name, phone }: beneficiariesType) => {
    navigation.navigate('SendBeneficiariesInput', {
      Amount: amount,
      Name: name,
      Phone: phone,
      Category
    } as unknown as undefined);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  const handleBackClick = () => {
    navigation.goBack()
  };

  const filteredBeneficiaries = useMemo(() => {
    const query = debouncedSearch.toLowerCase();
    return displayBeneficiaries.filter(
      ({ name, phone }) =>
        name.toLowerCase().includes(query) || phone.includes(query)
    );
  }, [debouncedSearch, displayBeneficiaries]);

  const renderItem = ({ item }: { item: { name: string; phone: string } }) => {
    const Icon = (
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => { }}
      >
        <Text style={styles.name}>{getInitials(item.name)}</Text>
      </TouchableOpacity>
    )
    const actionIcon = <Feather name="more-vertical" size={24} color="#23262F" />
    return (
      <Card
        Icon={Icon}
        title={item.name}
        content={item.phone}
        actionIcon={actionIcon}
        onPress={() => handleBeneficiaryClick(item)}
      />
    )
  };

  const handleRecentClick = () => {
    setActiveTab('recent')
    setDisplayBeneficiaries((beneficiaries) => [...recentBeneficiaries])
  }

  const handleSavedClick = () => {
    setActiveTab('saved')
    setDisplayBeneficiaries((beneficiaries) => [...savedBeneficiaries])
  }

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
          <Text style={styles.title}>Beneficiaries</Text>
        </View>

        <View style={styles.inputView}>
          <CustomTextInput
            value={search}
            onChangeText={setSearch}
            leftIcon={<Ionicons name="search-outline" size={18} color="rgba(60, 60, 67, 0.6)" />}
            placeholder='Search name or account number'
            placeholderTextColor={'rgba(60, 60, 67, 0.6)'}
            containerStyle={styles.inputContainer}
          />
        </View>

        <View style={styles.tabContainer}>
          <CustomButton
            title="Recent Beneficiaries"
            onPress={handleRecentClick}
            variant="primary"
            mode="outline"
            text
            buttonStyle={[
              styles.tabButton,
              activeTab === 'recent' && styles.activeTabButton,
            ]}
            textStyle={[
              styles.tabButtonText,
              activeTab === 'recent' && styles.activeTabText,
            ]}
          />
          <CustomButton
            title="Saved Beneficiaries"
            onPress={handleSavedClick}
            variant="primary"
            mode="outline"
            text
            buttonStyle={[
              styles.tabButton,
              activeTab === 'saved' && styles.activeTabButton,
            ]}
            textStyle={[
              styles.tabButtonText,
              activeTab === 'saved' && styles.activeTabText,
            ]}
          />
        </View>

        <FlatList
          data={filteredBeneficiaries}
          keyExtractor={(item, index) => `${item.phone}-${index}`}
          renderItem={renderItem}
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
  inputContainer: {
    height: 40,
    borderRadius: 10
  },
  title: {
    fontSize: 20,
    fontFamily: "ClashGrotesk-Medium",
    textAlign: 'center',
    paddingLeft: 20,
    paddingBottom: 2,
  },
  inputView: {
    marginBottom: 20,
  },






  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    padding: 0,
    marginRight: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    borderRadius: 0,
    paddingBottom: 7
  },
  activeTabButton: {
    borderBottomColor: Colors.purple,
  },
  tabButtonText: {
    fontSize: 17,
  },
  activeTabText: {
    fontSize: 17,
    fontFamily: 'ClashGrotesk-Medium',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#887EF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'ClashGrotesk-Medium',
    color: Colors.white
  },
});

export default SendBeneficiariesScreen;
