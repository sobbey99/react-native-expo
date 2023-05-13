import { useCallback, useLayoutEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import MapView, { Marker } from "react-native-maps"
import IconButton from "../components/UI/IconButton"

const Map = ({navigation, route}) => {
    const initialLocation = route.params && {
        lat: route.params.initialLat, 
        lng: route.params.initialLng
    }
    const [selectedLocation, setSelectedLocation] = useState(initialLocation)


    const region = {
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    function selectLocationHandler(e){
        if(initialLocation) {
            return
        }
        // console.log(e)
        const lat = e.nativeEvent.coordinate.latitude
        const lng = e.nativeEvent.coordinate.longitude

        setSelectedLocation({
            lat,
            lng
        })
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert(
                "No location picked",
                "You have to pick a location by tapping on the map!"
            )
            return
        }

        navigation.navigate("AddPlace", {
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng
        })
    }, [navigation, selectedLocation])

    useLayoutEffect(() => {
        if(initialLocation){
            return
        }
        navigation.setOptions({
            headerRight: ({tintColor}) => <IconButton name="save" size={24} color={tintColor} onPress={savePickedLocationHandler}/>
        })
    }, [navigation, savePickedLocationHandler, initialLocation])

  return (
    <MapView
     style={styles.map}
     initialRegion={region}
     onPress={selectLocationHandler}
    >
    { selectedLocation
    &&  <Marker 
            title='Picked Location'
            coordinate={{
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng,
            }}
            />}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
})