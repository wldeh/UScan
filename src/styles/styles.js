import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  nav: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  camera: {
    flex: 1
  },
  flashlightContainer: {
    position: 'absolute',
    top: 56,
    left: 12,
    margin: 16
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 225, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default styles
