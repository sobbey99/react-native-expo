import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import React from 'react'

import { CATEGORIES } from "../data/dummy-data"
import CategoryGridTile from '../components/CategoryGridTile'




const CategoriesScreen = ({navigation}) => {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("MealsOverview", {
        categoryId: itemData.item.id,
      })
    }
  
      return <CategoryGridTile 
        title={itemData.item.title} 
        color={itemData.item.color}
        onPress={pressHandler}
      />
  }

  function pressFavoritesRoute() {
    navigation.navigate("Favorites")
  }

  return (
    <>
    <Pressable 
    style={styles.favoriteBtn}
    onPress={pressFavoritesRoute}
    >
      <Text>Favorites</Text>
    </Pressable>
   <FlatList 
        data={CATEGORIES}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
   />
    </>
  )
}


export default CategoriesScreen

const styles = StyleSheet.create({
  favoriteBtn: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    marginBottom: 20,
  }
})