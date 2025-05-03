import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { BadgesNavigationProp } from '../types/profile.navigation';
import { Image } from 'react-native';
import Card from '../components/payment/Card';

const badges = [
  { id: 'beginner', name: 'Beginner', color: Colors.lightBlue, img: require('../assets/head.png') },
  { id: 'intermediate', name: 'Intermediate', color: Colors.green, img: require('../assets/mic.png') },
  { id: 'expert', name: 'Expert', color: '#F7A666', img: require('../assets/people.png') },
  { id: 'master', name: 'Master', color: '#9A9EFF', img: require('../assets/badge.png') },
  { id: 'legend', name: 'Legend', color: '#EA71F5', img: require('../assets/together.png') },
];

const BadgesScreen = () => {
  const navigation = useNavigation<BadgesNavigationProp>();

  const handleBackClick = () => {
    navigation.goBack()
  };

  const renderBadgeItem = ({ item }: { item: typeof badges[0] }) => (
    <View style={styles.badgeItem}>
      <Image
        source={item.img}
        style={{
          width: 42,
          height: 45,
          resizeMode: 'contain',
        }}
      />
      <Text
        style={[
          styles.badgeText,
          { color: item.color },
        ]}
      >
        {item.name}
      </Text>
    </View>
  );

  const Icon = (
    <Image
      source={require('../assets/trophy.png')}
      style={{
        width: 42,
        height: 45,
        resizeMode: 'contain',
      }}
    />
  );
  const actionIcon = <View style={styles.endView}>
    <MaterialIcons name="chevron-right" size={24} color={Colors.icon} />
  </View>

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="keyboard-backspace"
          size={25}
          color={Colors.primary}
          onPress={handleBackClick}
        />
        <Text style={styles.title}>Badges</Text>
      </View>
      <View style={styles.rewardSection}>
        <Image
          source={require('../assets/trophy.png')}
          style={{
            width: 106,
            height: 120,
            resizeMode: 'contain',
          }}
        />
        <Text style={styles.sectionTitle}>REWARD STARS</Text>
        <Text style={styles.starCount}>⭐️150</Text>
        <Text style={styles.masterText}>MASTER</Text>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Beginner Level</Text>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>100/250 ⭐️</Text>
          <Text style={styles.progressSubtext}>450 stars to Intermediate</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '40%' }]} />
          <View style={styles.progressBarRemaining} />
        </View>
      </View>

      <View style={styles.rewardsContainer}>
        <Card
          title='My Rewards'
          content='You have 1 reward(s) to redeem'
          onPress={() => { }}
          Icon={Icon}
          actionIcon={actionIcon}
          borderBottom
        />
      </View>
      <View style={styles.progressTextContainer}>
        <Ionicons
          name="information-circle-outline"
          size={24}
          color={Colors.purple}
        />
        <Text style={styles.noteText}>
          Note: Your rewards will expire on 31st December, 2024.
        </Text>
      </View>

      <Text style={styles.exploreTitle}>Explore Badges</Text>
      <FlatList
        data={badges}
        renderItem={renderBadgeItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.badgesList}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: "ClashGrotesk-Medium",
    textAlign: 'center',
    paddingLeft: 20,
    paddingBottom: 2,
  },
  rewardSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    color: Colors.label,
    fontFamily: "ClashGrotesk-Medium",
    marginTop: 10,
    marginBottom: 6,
  },
  starCount: {
    fontSize: 36,
    fontFamily: "ClashGrotesk-Medium",
    color: Colors.primary,
    marginBottom: 15,
  },
  masterText: {
    fontSize: 12,
    fontFamily: "ClashGrotesk-Medium",
    color: Colors.lightBlue,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#DAF7FF',
    borderRadius: 15,
  },
  progressContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  progressTitle: {
    fontSize: 12,
    fontFamily: "ClashGrotesk-Medium",
    color: '#1D2739',
    marginBottom: 7,
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    backgroundColor: '#4CAF50',
    height: '100%',
  },
  progressBarRemaining: {
    flex: 1,
    backgroundColor: '#E9E9E9',
    height: '100%',
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
  progressText: {
    fontSize: 10,
    color: '#333',
    marginBottom: 4,
  },
  progressSubtext: {
    fontSize: 10,
    color: '#666',
  },
  endView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tier: {
    fontSize: 12,
    color: Colors.green,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: Colors.lighter,
    borderRadius: 8,
  },
  rewardsContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginBottom: 15,
  },
  rewardsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  rewardsText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 13,
    color: '#666',
  },
  exploreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 35,
    marginBottom: 16,
  },
  badgesList: {
    paddingBottom: 20,
  },
  badgeItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    alignItems: 'center',
  },
  unlockedBadge: {
    backgroundColor: '#E6F0FF',
    borderColor: '#0066FF',
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  unlockedBadgeText: {
    color: '#0066FF',
    fontWeight: '600',
  },
  checkmark: {
    color: '#0066FF',
    marginLeft: 4,
    fontWeight: 'bold',
  },
});

export default BadgesScreen;