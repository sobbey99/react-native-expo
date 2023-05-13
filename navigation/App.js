import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesScreen from "./screens/FavoritesScreen"
// import FavoriteContextProvider from './store/context/favorites-context';

import { Provider } from 'react-redux';
import {store} from "./store/redux/store"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              title: "All Categories",
              headerStyle: {backgroundColor: "#351401"},
              headerTintColor: "white",
              contentStyle: {backgroundColor: "#3f2f25"}
              }} 
            >
              <Stack.Screen 
                name="MealsCategories" 
                component={CategoriesScreen} 
                options= {{
                  title: "All Categories"
                }}
              />
              <Stack.Screen 
                name="MealsOverview" 
                component={MealsOverviewScreen}
                // options={({route, navigation}) => {
                //   const catId = route.params.categoryId
                //   return {
                //     title: catId
                //   }
                // }}
              />
              <Stack.Screen
                name="MealDetail"
                component={MealDetailScreen}
                // options={{
                //   headerRight: () => {
                //     return <Button title="Tap me!" />
                //   }
                // }}
              />
              <Stack.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                  headerShown: false
                }}
              />
        </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    </>
  );
}

const styles = StyleSheet.create({

});
