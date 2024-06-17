import * as React from 'react'
import { Button, Text, View } from 'react-native'

import styles from '../styles/styles'

export function SettingsScreen({ navigation }) {
  return (
    <View style={styles.nav}>
      <Text>Settings Screen</Text>
      <Button
        title='Go to Profile'
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  )
}
