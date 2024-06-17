import Ionicons from '@expo/vector-icons/MaterialIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'

import { CameraScreen } from '../screens/CameraScreen'
import ProfileStackNavigator from './ProfileStackNavigator'
import SettingsStackNavigator from './SettingsStackNavigator'

const Tab = createBottomTabNavigator()

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Scan'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'History') {
            iconName = 'blur-on'
          } else if (route.name === 'Scan') {
            iconName = 'qr-code-scanner'
          } else if (route.name === 'Profile') {
            iconName = 'person'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#32cd32',
        tabBarInactiveTintColor: 'rgba(155, 155, 155, 1)',
        tabBarStyle: {
          backgroundColor:
            route.name === 'Scan' ? 'rgba(72,72,72, 0.999)' : 'white',
          borderTopWidth: 0,
          position: 'absolute'
        }
      })}
    >
      <Tab.Screen name='History' component={SettingsStackNavigator} />
      <Tab.Screen name='Scan' component={CameraScreen} />
      <Tab.Screen name='Profile' component={ProfileStackNavigator} />
    </Tab.Navigator>
  )
}

export default MainTabNavigator
