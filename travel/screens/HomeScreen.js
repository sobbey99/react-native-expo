import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native'
import {
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';
import { HeroImage } from '../assets';


const HomeScreen = () => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const insets = useSafeAreaInsets();
  return (
    <SafeAreaView className="bg-white flex-1" >
        
        <View 
        style={{
            // Paddings to handle safe area
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          }}>
            {/* first section */}
            <View className="flex-row px-6 mt-8 items-center space-x-2">
                <View className="w-16 h-16 bg-black rounded-full items-center justify-center"><Text className="text-[#00BCC9] text-3xl font-semibold">Go</Text></View>

                <Text className="text-[#2A2B4B] text-3xl font-semibold">Travel</Text>
            </View>

            {/* second section */}
            <View className="px-6 mt-8 space-y-3">
                <Text className="text-[#3C6072] text-[42px]">Enjoy the trip with</Text>
                <Text className="text-[#154246] text-[38px] font-bold">Good Moments</Text>

                <Text className="text-[#3C6072] text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, saepe ipsa?
                </Text>
            </View>
        </View>
        {/* Circle Section */}
        <View className="w-[400px] h-[400px] bg-[#00BCC9] rounded-full absolute -right-36 bottom-36 -z-40">
        </View>
        <View className="w-[400px] h-[400px] bg-[#E99265] rounded-full absolute -left-36 -bottom-28 -z-40">
        </View>

        {/* Image container */}
        <View className="flex-1 relative items-center justify-center">
          <Animatable.Image 
            animation="fadeIn"
            easing="ease-in-out"
            source={HeroImage}
            className="w-full h-full object-cover mt-5"
            style={{objectFit: "contain"}}
          />
            <TouchableOpacity 
            onPress={() => navigation.navigate("Discover")}
            className="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#00BCC9] rounded-full items-center justify-center">
                
                    <Animatable.View 
                    animation="pulse"
                    easing="ease-in-out"
                    iterationCount="infinite"
                    className="w-20 h-20 items-center justify-center rounded-full bg-[#00BCC9]">
                        <Text className="text-gray-50 text-[36px] font-semibold">Go</Text>
                    </Animatable.View>
               
            </TouchableOpacity>
        </View>

        
    </SafeAreaView>
  )
}

export default HomeScreen