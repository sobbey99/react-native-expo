import { View, Text } from 'react-native'
import React from 'react'
import MealsList from '../components/MealsList/MealsList'
import { MEALS } from '../data/dummy-data'
import { useSelector } from 'react-redux'

// import {FavoritesContext} from "../store/context/favorites-context"

const FavoritesScreen = () => {
  const favoriteMealsIds = useSelector(state => state.favoriteMeals.ids)
  // const favoriteMealsCtx = useContext(FavoritesContext)

  const favoriteMeals = MEALS.filter(meal => favoriteMealsIds.includes(meal.id))
  return (
    <MealsList items={favoriteMeals} />
  )
}

export default FavoritesScreen