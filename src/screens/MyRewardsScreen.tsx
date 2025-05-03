import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { MyRewardsNavigationProp } from '../types/profile.navigation';
import { Text } from '../theme/CustomText';

const rewardLevels = [
  {
    title: 'Beginner Level',
    rewards: ['10,000 stars worth', 'NGN 500 airtime reward'],
    backgroundColor: '#172242',
    img: require('../assets/head.png')
  },
  {
    title: 'Intermediate Level',
    rewards: [
      'Gorem ipsum dolor sit consectetur',
      'Dorem ipsum dolor sit amet',
      'Worem ipsum dolor'
    ],
    backgroundColor: '#3C404A',
    img: require('../assets/people.png')
  },
];

const MyRewardsScreen = () => {
  const navigation = useNavigation<MyRewardsNavigationProp>();

  const handleBackClick = () => {
    navigation.goBack()
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >

      <View style={styles.header}>
        <MaterialIcons
          name="keyboard-backspace"
          size={25}
          color={Colors.primary}
          onPress={handleBackClick}
        />
        <Text style={styles.title}>My Rewards</Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Hello, Gift</Text>
        <Text style={styles.level}>
          You are at
          <Text style={styles.levelText}>{" "}Beginner Level</Text>
        </Text>
        <Text style={styles.points}>Total Points: 200</Text>
      </View>
      <View style={styles.levelsContainer}>
        {rewardLevels.map((level, index) => (
          <View
            key={index}
            style={[
              styles.levelContainer,
              { backgroundColor: level.backgroundColor }
            ]}
          >
            <Image
              source={level.img}
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain',
              }}
            />
            <View style={styles.levelHeader}>
              <Text style={styles.levelTitle}>{level.title}</Text>
            </View>

            <View style={styles.rewardContainer}>
              {level.rewards.map((reward, i) => (
                <View key={i} style={styles.rewardItem}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.rewardText}>{reward}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 30,
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
  contentContainer: {
    padding: 20,
  },
  headerContainer: {
    marginBottom: 30,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  greeting: {
    fontFamily: "ClashGrotesk-Medium",
    fontSize: 20,
    color: '#333',
    marginBottom: 7,
  },
  level: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
    marginTop: 5,
  },
  levelText: {
    color: Colors.purple,
  },
  points: {
    color: '#666',
  },
  levelContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    // justifyContent: 'center',
    width: 160,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: "ClashGrotesk-Medium",
    color: Colors.white,
  },
  currentBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginLeft: 8,
  },
  levelPoints: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  levelsContainer: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    marginTop: 20,
  },
  rewardContainer: {
    // paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // alignSelf: 'center',
    // backgroundColor: 'red',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#666',
    marginTop: 8,
    marginRight: 8,
  },
  rewardText: {
    fontSize: 12,
    color: '#ADB1C6',
    lineHeight: 20,
  },
});

export default MyRewardsScreen;