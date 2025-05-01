import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import { Colors } from '../utils/colors';
import PaymentsScreen from '../screens/PaymentsScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-variant';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Payments') {
            return <FontAwesome6 name="qrcode" size={size} color={color} />;
          }
          // else if (route.name === 'Wallet') {
          //   iconName = 'account-balance-wallet';
          //   return <MaterialIcons name={iconName} size={size} color={color} />;
          // } else if (route.name === 'Profile') {
          //   iconName = 'person';
          //   return <MaterialIcons name={iconName} size={size} color={color} />;
          // }
          // active color: #292D32
        },
        tabBarActiveTintColor: Colors.activeTint,
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#EEE',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Payments" component={PaymentsScreen} />
      {/* <Tab.Screen name="Wallet" component={WalletScreen} /> */}
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

export default MainTabNavigator;








































// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import { HomeScreen, SearchScreen, ProfileScreen } from '../screens';
// import TabBarIcon from '../components/TabBarIcon';
// import HomeScreen from '../screens/HomeScreen';

// const Tab = createBottomTabNavigator();

// const MainTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => (
//           <TabBarIcon route={route} focused={focused} color={color} size={size} />
//         ),
//         tabBarActiveTintColor: '#2F50C1', 
//         tabBarInactiveTintColor: 'gray',
//         headerShown: false,
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       {/* <Tab.Screen name="Search" component={SearchScreen} /> */}
//       {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
//     </Tab.Navigator>
//   );
// };

// export default MainTabNavigator;