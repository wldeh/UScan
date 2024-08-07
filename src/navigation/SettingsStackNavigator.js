import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { SettingsScreen } from '../screens/SettingsScreen'

const SettingsStack = createNativeStackNavigator()

const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name='Settings' component={SettingsScreen} />
    </SettingsStack.Navigator>
  )
}

export default SettingsStackNavigator
