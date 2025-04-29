import React, { useEffect } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../utils/colors'
import { RootNavigationProp } from '../types/navigation';

const { width, height } = Dimensions.get('window');

const Root = () => {
  const navigation = useNavigation<RootNavigationProp>();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Splash');
    }, 1000);
  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/rootLogo.png')}
        style={{
          width: width * 0.8,
          height: 100,
          marginTop: 20,
          marginBottom: 20,
          alignSelf: 'center',
          resizeMode: 'contain',
        }}
      />
    </View>
  )
}

export default Root

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
})