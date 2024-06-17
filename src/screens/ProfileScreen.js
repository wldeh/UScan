import * as React from 'react'
import { Button, Text, View } from 'react-native'

import styles from '../styles/styles'

export function ProfileScreen({ navigation }) {
  return (
    <View style={styles.nav}>
      <Text>Profile Screen</Text>
      <Button
        title='Go to Settings'
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  )
}
