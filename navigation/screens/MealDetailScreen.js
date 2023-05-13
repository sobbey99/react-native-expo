import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, {useLayoutEffect, } from 'react'

import { MEALS } from "../data/dummy-data"
import MealDetails from '../components/MealDetails'
import Subtitle from '../components/MealDetail/Subtitle'
import List from '../components/MealDetail/List'
import IconButton from '../components/IconButton'
import { useDispatch, useSelector } from 'react-redux'
// import { FavoritesContext } from '../store/context/favorites-context'

import {addFavorite, removeFavorite} from "../store/redux/favorites"

const MealDetailScreen = ({route, navigation}) => {
  //  const favoriteMealsCtx = useContext(FavoritesContext)

  const favouriteMealIds = useSelector((state) => state.favoriteMeals.ids )
  const dispatch = useDispatch()

    const mealId = route.params.mealId

    const selectedMeal = MEALS.find((meal) => meal.id === mealId)



  const mealIsFavorite = favouriteMealIds.includes(mealId)

  function headerButtonPressHandler() {
    if (mealIsFavorite) {
      dispatch(removeFavorite({id: mealId}))
      // favoriteMealsCtx.removeFavorite(mealId)
    } else {
      // favoriteMealsCtx.addFavorite(mealId)
      dispatch(addFavorite({id: mealId}))
    }
  }

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => {
          return <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color="white" 
            onPress={headerButtonPressHandler}
           />
        }
      })
    }, [navigation, headerButtonPressHandler])
  return (
    <ScrollView style={styles.rootContainer}>
      <Image 
        style={styles.image}
        source={{uri : selectedMeal.imageUrl}}
      />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails 
        duration={selectedMeal.duration} 
        complexity={selectedMeal.complexity} 
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />

      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingridients</Subtitle>
          <List data={selectedMeal.ingredients}/>
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps}/>
        </View>
      </View>
    </ScrollView>
  )
}

export default MealDetailScreen

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32
  },
  image: {
    width: "100%",
    height: 350,

  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white"
  },
  detailText: {
    color: "white"
  },
  listOuterContainer: {
    alignItems: "center"
  },
  listContainer: {
    width: "80%"
  }
})