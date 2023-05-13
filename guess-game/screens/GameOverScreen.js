import { View,Image, StyleSheet, Text, useWindowDimensions, ScrollView} from "react-native"

import Title from "../components/ui/Title"
import Colors from "../constants/colors"
import PrimaryButton from "../components/ui/PrimaryButton"

export default function GameOverScreen({roundsNumber, userNumber, onStartNewGame}) {

  const {width, height} = useWindowDimensions()

  let imageSize = 300

  if (width < 300) {
    imageSize = 150
  }

  if (height < 400) {
    imageSize = 80
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image 
            style={styles.image}
            source={require("../assets/images/success.png")}
          />
        </View>

          <Text style={styles.summaryText}>
            Your phone needed <Text style={styles.hightlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.hightlight}>{userNumber}</Text>.
          </Text>
          <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  )
}

// const deviceWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    // width: deviceWidth < 300 ? 150 : 300,
    // height: deviceWidth < 300 ? 150 : 300,
    // borderRadius: deviceWidth < 300 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  hightlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500 
  }
})
