import * as React from 'react'
import Ionicons from '@expo/vector-icons/MaterialIcons'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useState } from 'react'
import { Button, Text, View } from 'react-native'
import { SheetProvider } from 'react-native-actions-sheet'
import { SheetManager } from 'react-native-actions-sheet'

import { temp } from '../services/temp'
import styles from '../styles/styles'

export function CameraScreen() {
  const [facing, setFacing] = useState('back')
  const [flash, setFlash] = useState(false)
  const [permission, requestPermission] = useCameraPermissions()
  const [hasScanned, setHasScanned] = useState(false)

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    )
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'))
  }

  const handleQrcodeScanner = async (scanningResult) => {
    if (hasScanned) return
    setHasScanned(true)
    //SheetManager.show("example");

    //console.log(`Data: ${scanningResult.data}\n`);

    //const details = await get_item_details({ barcode: scanningResult.data });
    const details = await temp({ barcode: scanningResult.data })
    //console.log("\x1b[32m", details);

    SheetManager.show('example', {
      payload: details
    })

    setHasScanned(false)
  }

  function toggleFlash() {
    setFlash((current) => (current === true ? false : true))
  }

  return (
    <SheetProvider>
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing={facing}
          autofocus='on'
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'ean13', 'ean8', 'upc_e', 'upc_a']
          }}
          onBarcodeScanned={handleQrcodeScanner}
          enableTorch={flash}
        >
          <View style={styles.flashlightContainer}>
            <View style={styles.circle}>
              <Ionicons
                name='flashlight-on'
                size={24}
                color='white'
                onPress={toggleFlash}
              />
            </View>
          </View>
        </CameraView>
      </View>
    </SheetProvider>
  )
}
