import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../utils/colors';
import PaymentsScreen from '../screens/PaymentsScreen';
import HomeStackNavigator from './HomeStackNavigator';
import MoreScreen from '../screens/MoreScreen';
import { View } from 'react-native';
import PaymentStackNavigator from './PaymentStackNavigator';

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
            iconName = 'money';
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === 'More') {
            iconName = 'more-horizontal';
            return <View
              style={{
                borderColor: color,
                borderWidth: 2,
                borderRadius: 5,
              }}
            >
              <Feather name={iconName} size={size - 10} color={color} />
            </View>;
          }
          // else if (route.name === 'Profile') {
          //   iconName = 'person';
          //   return <MaterialIcons name={iconName} size={size} color={color} />;
          // }
          // active color: #292D32
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.grey,
        // tabBarInactiveTintColor: '#000A4A',
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
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Payments" component={PaymentStackNavigator} />
      <Tab.Screen name="More" component={MoreScreen} />
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