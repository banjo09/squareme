import React, { FC, useRef } from 'react'
import { Animated, Image, Pressable, StyleSheet, View } from 'react-native'
import { Colors } from '../utils/colors'
import { Text } from '../theme/CustomText'

type AnimatedBoxProps = {
  action: {
    id: string;
    icon: any;
    name: string;
  }
}

const AnimatedBox: FC<AnimatedBoxProps> = ({
  action,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.spring(scale, {
      toValue: 0.8,
      useNativeDriver: true,
      stiffness: 400,
      damping: 30,
      mass: 1,
    }).start(() => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        stiffness: 400,
        damping: 30,
        mass: 1,
      }).start();
    });
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable onPress={handlePress} style={styles.quickAction}>
        <View style={styles.quickActionIcon}>
          <Image
            source={action.icon}
            style={{
              width: 24,
              height: 24,
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text style={styles.quickActionText}>{action.name}</Text>
      </Pressable>
    </Animated.View>
  )
}

export default AnimatedBox

const styles = StyleSheet.create({
  quickAction: {
    width: 70,
    height: 70,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: Colors.lighter,
  },
  quickActionIcon: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  quickActionText: {
    fontSize: 12,
    textAlign: 'center',
  },
})
