import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import {
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';
  import React, { useEffect, useLayoutEffect } from 'react'
import { Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from '../assets';
import { FontAwesome } from '@expo/vector-icons';
import MenuContainer from '../components/MenuContainer';
import ItemCardContainer from '../components/ItemCardContainer';
import { getPlacesData } from '../api';


const Discover = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation()

  const [type, setType] = React.useState("restaurants")
  const [isLoading, setIsLoading] = React.useState(false)
  const [mainData, setMainData] = React.useState([])

  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false
      })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getPlacesData().then(data => {
      setMainData(data)
      setInterval(() => {
        setIsLoading(false)
      }, 2000)
    })
  }, [])
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View
      style={{
        // Paddings to handle safe area
        paddingTop: insets.top,
      }}
      className="flex-row items-center justify-between px-8"
    >
      <View>
        <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
        <Text className="text-[#527283] text-[30px]">the beauty Today</Text>
      </View>

      <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
        <Image source={Avatar} className="w-full h-full rounded-md object-cover"/>
      </View>
    </View>

    <View className="flex-row items-center bg-red mx-4 rounded-xl py-1 px-4 shadow-lg ">
    <GooglePlacesAutocomplete
      GooglePlacesDetailsQuery={{fields : "geometry"}}
      placeholder='Search'
      fetchDetails={true}
      onPress={(data, details = null) => {
        console.log(details?.geometry?.viewport);
      }}
      query={{
        key: 'AIzaSyBqv4_C26RXzkVYocH2SlgyYieqYoqiZR0',
        language: 'en',
      }}
    />
    </View>

    {/* Menu Container */}
      {isLoading 
      ? <View className="flex-1 items-center justify-center"><ActivityIndicator size="large" color="#0B646B"/></View> 
      : <ScrollView>
      <View className="flex-row items-center justify-between px-4 mt-8">
        <MenuContainer
          key={"hotel"}
          title="Hotels"
          imageSrc={Hotels}
          type={type}
          setType={setType}
        />
        <MenuContainer
          key={"attractions"}
          title="Attractions"
          imageSrc={Attractions}
          type={type}
          setType={setType}
        />
        <MenuContainer
          key={"restaurants"}
          title="Restaurants"
          imageSrc={Restaurants}
          type={type}
          setType={setType}
        />
      </View>

      <View>
        <View className="flex-row items-center justify-between px-4 mt-8">
          <Text className="text-[#2C7379] text-[28px] font-bold">Top Tips</Text>
          <TouchableOpacity className="flex-row items-center justify-center space-x-2">
            <Text className="text-[#A0C4C7] text-[20px] font-bold">Explore</Text>
            <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
          </TouchableOpacity>
        </View>

        <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
          {mainData?.length > 0 
          ? (<>
              {mainData?.map((data,i) => (
                <ItemCardContainer 
                key={i} 
                imageSrc={
                  data?.photo?.images?.medium.url ?
                  data?.photo?.images?.medium.url :
                  "https://cdn.pixabay.com/photo/2019/05/07/09/01/spices-4185324_960_720.jpg"
                } 
                title={data?.name} 
                location={data?.location_string}/>
              ))}
          </> )
          
          : (<>
              <View className="w-full h-[250px] items-center space-y-8 justify-center">
                <Image source={NotFound} className="w-32 h-32 object-cover"/>
                <Text className="text-2xl text-[#428288] font-semibold">
                  Oops...No Data Found
                </Text>
              </View>
            </>)
          }

        </View>
      </View>
    </ScrollView>}
    </SafeAreaView>
  )
}

export default Discover