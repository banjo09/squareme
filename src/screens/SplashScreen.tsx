import React, { useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text as RNText,
  View,
  Animated,
  FlatList,
} from 'react-native'
import { Colors } from '../utils/colors';
import CustomButton from '../components/CustomButton';
import { Text } from '../theme/CustomText';
import { useNavigation } from '@react-navigation/native';
import { SplashScreenNavigationProp } from '../types/navigation';

const { width, height } = Dimensions.get('window');

const captions = [
  {
    id: '1',
    title: 'Spend your money easily without any complications',
    content: 'Receive funds sent to you in seconds.',
  },
  {
    id: '2',
    title: 'A super secure way to pay your bills',
    content: 'Pay your bills with the cheapest rates in town.',
  },
  {
    id: '3',
    title: 'A virtual USD card for your payments',
    content: 'Shop globally. Renew your subscriptions with ease.',
  },
];

const carouselImages = [
  require('../assets/caro1.png'),
  require('../assets/caro2.png'),
  require('../assets/caro3.png'),
];

const SplashScreen = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const carouselRef = useRef<FlatList>(null);

  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % carouselImages.length;
      setCurrentIndex(nextIndex);
      carouselRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderCarouselItem = ({ item }: { item: any }) => (
    <Image
      source={item}
      style={styles.carouselImage}
      resizeMode="contain"
    />
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

  const onCreateAccountPress = () => {
    // Handle create account button press
  }
  const onLoginPress = () => {
    navigation.navigate('Login');
  }

  return (
    <View style={{ flex: 1 }}>
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

      <View
        key={captions[currentIndex].id}
        style={styles.marketingSection}
      >
        <Text style={styles.marketingHeaderText}>
          {captions[currentIndex].title}
        </Text>
        <Text style={styles.marketingText}>
          {captions[currentIndex].content}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Create an account"
          onPress={onCreateAccountPress}
          variant='primary'
          mode='filled'
          buttonStyle={styles.createButton}
        />
        <CustomButton
          title="I already have an account"
          onPress={onLoginPress}
          variant='primary'
        />
      </View>
    </View >
  )
}

export default SplashScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  carouselImage: {
    width: width * 0.99,
    height: height * 0.52,
    alignSelf: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  indicator: {
    width: 28,
    height: 5,
    borderRadius: 7,
    backgroundColor: Colors.accent,
    marginHorizontal: 5,
  },
  marketingSection: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  marketingHeaderText: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 30,
    width: '85%',
    textAlign: 'center',
    color: Colors.primary,
  },
  marketingText: {
    textAlign: 'center',
    marginTop: 23,
    color: Colors.secondary,
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  createButton: {
    marginBottom: 15,
  },
})