import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { ProfileScreen } from '../screens/ProfileScreen'

const ProfileStack = createNativeStackNavigator()

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name='UserProfile' component={ProfileScreen} />
    </ProfileStack.Navigator>
  )
}

export default ProfileStackNavigator
