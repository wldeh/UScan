import Ionicons from '@expo/vector-icons/MaterialIcons'
import React, { useEffect, useRef, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native'
import ActionSheet, { useScrollHandlers } from 'react-native-actions-sheet'

function ExampleSheet({ sheetId, payload }) {
  const actionSheetRef = useRef(null)
  const scrollHandlers = useScrollHandlers('1', actionSheetRef)
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [isBounce, setIsBounce] = useState(true)
  const [yOffset, setYOffset] = useState(0)

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else if (actionSheetRef.current) {
      if (scrollEnabled) {
        actionSheetRef.current.snapToIndex(1)
      } else {
        actionSheetRef.current.snapToIndex(0)
      }
    }
  }, [scrollEnabled])

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y
    setYOffset(yOffset)
    if (yOffset < 50) {
      setIsBounce(false)
    } else {
      setIsBounce(true)
    }
  }

  // top things to look for in supplelments
  const negatives = [
    {
      title: 'Additives',
      description: 'Contains unwanted additives or preservatives',
      value: 'Yes',
      color: 'red'
    },
    {
      title: 'Side Effects',
      description: 'Reported side effects by users',
      value: 'Headaches, nausea',
      color: 'red'
    },
    {
      title: 'High Cost',
      description: 'Expensive compared to similar products',
      value: '$50',
      color: 'red'
    },
    {
      title: 'Low Potency',
      description: 'Low concentration of active ingredients',
      value: '50mg',
      color: 'red'
    },
    {
      title: 'Negative Reviews',
      description: 'High number of negative user reviews',
      value: '2/5',
      color: 'red'
    }
  ]

  const positives = [
    {
      title: 'Natural Ingredients',
      description: 'Contains all-natural ingredients',
      value: 'Yes',
      color: 'green'
    },
    {
      title: 'High Potency',
      description: 'Contains potent active ingredients',
      value: '500mg',
      color: 'green'
    },
    {
      title: 'No Fillers',
      description: 'Free from unnecessary fillers',
      value: 'Yes',
      color: 'green'
    },
    {
      title: 'Certifications',
      description: 'Certified by recognized bodies (e.g., GMP, FDA)',
      value: 'GMP, FDA',
      color: 'green'
    },
    {
      title: 'Positive Reviews',
      description: 'High number of positive user reviews',
      value: '4.5/5',
      color: 'green'
    }
  ]

  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      /*onBeforeShow={() => {
        console.log("sheet payload", payload?.data);
      }}*/
      onOpen={() => {
        Vibration.vibrate(10)
      }}
      snapPoints={[31, 100]}
      initialSnapIndex={0}
      statusBarTranslucent={true}
      drawUnderStatusBar={true}
      gestureEnabled={true}
      defaultOverlayOpacity={0.3}
      isModal={isModal}
      springOffset={1}
      openAnimationConfig={{
        tension: 300,
        friction: 170,
        useNativeDriver: true
      }}
      closeAnimationConfig={{
        tension: 300,
        friction: 17,
        useNativeDriver: true
      }}
      onSnapIndexChange={(index) => {
        if (index === 1 && yOffset === 0) {
          setScrollEnabled(true)
          //console.log("ActionSheet is fully open at snap point 100");
        } else {
          setScrollEnabled(false)
        }
      }}
    >
      <View
        style={{
          paddingHorizontal: 12,
          maxHeight: '100%'
        }}
      >
        <ScrollView
          {...scrollHandlers}
          scrollEnabled={scrollEnabled}
          style={styles.scrollview}
          bounces={isBounce}
          onScroll={handleScroll}
          scrollEventThrottle={16} // Adjust the frequency of scroll event updates
        >
          <View style={styles.imageTextContainer}>
            <Image
              source={{
                uri:
                  'https://api.ods.od.nih.gov/dsld/s3/pdf/thumbnails/' +
                  payload.id +
                  '.jpg'
              }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.headline}>{payload.fullName}</Text>
              <Text style={styles.subtext}>{payload.brandName}</Text>
              <Text style={styles.spacer}></Text>
              <View style={styles.scoreContainer}>
                <View style={styles.scoreCircle}></View>
                <View style={styles.scoreTextContainer}>
                  <Text style={styles.scoreText}>49/100</Text>
                  <Text style={styles.scoreLabel}>Poor</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>Negatives</Text>
            {negatives.map((negative, index) => (
              <View key={index} style={styles.detailRow}>
                <View style={styles.iconContainer}>
                  <Ionicons name='check-circle' size={24} color='green' />
                </View>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailText}>{negative.title}</Text>
                  <Text style={styles.detailSubtext}>
                    {negative.description}
                  </Text>
                </View>
                <Text style={styles.detailValue}>{negative.value}</Text>
                <View
                  style={[
                    styles.detailCircle,
                    { backgroundColor: negative.color }
                  ]}
                ></View>
              </View>
            ))}
            <Text style={styles.sectionTitle}>Positives</Text>
            {positives.map((positive, index) => (
              <View key={index}>
                <View style={styles.detailRow}>
                  <View style={styles.iconContainer}>
                    <Ionicons name='check-circle' size={24} color='green' />
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailText}>{positive.title}</Text>
                    <Text style={styles.detailSubtext}>
                      {positive.description}
                    </Text>
                  </View>
                  <Text style={styles.detailValue}>{positive.value}</Text>
                  <View
                    style={[
                      styles.detailCircle,
                      { backgroundColor: positive.color }
                    ]}
                  ></View>
                </View>
                {index < positives.length - 1 && (
                  <View style={styles.separatorContainer}>
                    <View style={styles.separator} />
                  </View>
                )}
              </View>
            ))}
          </View>

          <View style={styles.footer} />
        </ScrollView>
      </View>
    </ActionSheet>
  )
}

const styles = StyleSheet.create({
  footer: {
    height: 100
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  placeholder: {
    height: 15,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
    borderRadius: 5
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 100
  },
  btnLeft: {
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 100
  },
  input: {
    width: '100%',
    minHeight: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 15,
    paddingHorizontal: 10
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  scrollview: {
    width: '100%',
    padding: 12
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginLeft: -20,
    marginTop: -10,
    transform: [{ rotate: '90deg' }]
  },
  imageTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  textContainer: {
    marginLeft: -10,
    paddingRight: 115
  },
  headline: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#000'
  },
  subtext: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.75)',
    marginTop: 5
  },
  spacer: {
    height: 15
  },
  longText: {
    fontSize: 15.5,
    color: '#A9A9A9'
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2
  },
  scoreCircle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#E47D30', // Color for the score circle
    marginRight: 10
  },
  scoreTextContainer: {
    flexDirection: 'column'
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  scoreLabel: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)'
  },
  detailsContainer: {
    marginVertical: 20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  detailTextContainer: {
    flex: 1,
    marginLeft: 10
  },
  detailText: {
    fontSize: 16,
    color: '#000'
  },
  detailSubtext: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)'
  },
  detailValue: {
    fontSize: 16,
    color: '#000',
    marginRight: 10
  },
  detailCircle: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  separatorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  separator: {
    width: '89%',
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10
  }
})

export default ExampleSheet
