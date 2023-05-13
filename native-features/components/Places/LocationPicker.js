import { View, Text, StyleSheet, Alert, Image} from 'react-native'
import OutlinedButton from "../UI/OutlinedButton"
import { Colors } from '../../constants/colors'
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location"
import { useEffect, useState } from 'react'
import { getMapPreview, getAddress} from '../../util/location'
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native'


const LocationPicker = ({onLocationPicked}) => {
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const route = useRoute()
    const [locatinPermInfo, reqPermFunc] = useForegroundPermissions()

    const [pickedLocation, setPickedLocation] = useState()
    

    useEffect(() => {
      if(isFocused && route.params) {
        const mapPickedLocation = {lat: route.params.pickedLat, lng: route.params.pickedLng}
        setPickedLocation(mapPickedLocation)
      }
    }, [route, isFocused])

    useEffect(() => {
      async function handleLocation() {
        if (pickedLocation) {
          const address = await getAddress(pickedLocation.lat, pickedLocation.lng)
          onLocationPicked({...pickedLocation, address})
        }
      }
      handleLocation()
    }, [pickedLocation, onLocationPicked])

    async function verifyPerm() {
        try {
            if (locatinPermInfo.status === PermissionStatus.UNDETERMINED) {
              const permRes = await reqPermFunc();
              return permRes.granted;
            }
        
            if (locatinPermInfo.status === PermissionStatus.DENIED) {
              Alert.alert(
                "Insufficient Permissions!", 
                "You need to grant location permissions to use this app"
              );
              const permRes = await reqPermFunc();
              return permRes.granted;
            }
        
            return true;
          } catch (error) {
            console.log("Error requesting location permission:", error);
            return false;
          }
    }

    async function getLocationHandler() {
        const isPermited = await verifyPerm()

        if(!isPermited) {
            return
        }
        
        const location =  await getCurrentPositionAsync()
        // console.log(location)
        setPickedLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        })

    }

    function pickOnMapHandler() {
      navigation.navigate("Map")
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if (pickedLocation) {
      locationPreview =<Image source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}} style={styles.mapPreviewImage}/>
    }

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>

      <View style={styles.actions}>
        <OutlinedButton 
         onPress={getLocationHandler}
         icon="location"
        >
            Locate User
        </OutlinedButton>

        <OutlinedButton 
         onPress={pickOnMapHandler}
         icon="map"
        >
            Pick on Map
        </OutlinedButton>
      </View>
    </View>
  )
}

export default LocationPicker

const styles = StyleSheet.create({
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: "hidden",
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    mapPreviewImage: {
      width: "100%",
      height: "100%",
      // borderRadius: 4,
    }
})