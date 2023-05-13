import { View, Text, ScrollView, TextInput, StyleSheet} from 'react-native'
import React, { useCallback, useState } from 'react'
import { Colors } from '../../constants/colors'
import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'
import Button from '../UI/Button'
import { Place } from '../../models/place'


const PlaceForm = ({onCreatePlace}) => {
    const [enteredTitle, setEnteredTitle] = useState("")
    const [pickedLocation, setPickedLocation] = useState()
    const [imageTaken, setImageTaken] = useState()

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText)
    }

    function imageTakenHandler(imageUri){
        setImageTaken(imageUri)
    }

    const locationTakenHandler = useCallback(
        (location) => {
        setPickedLocation(location)
     }, 
    [])

    function savePlaceHandler() {
        const placeData = new Place(enteredTitle, imageTaken, pickedLocation)
        onCreatePlace(placeData)
    }
  return (
    <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>Title</Text>
            <TextInput 
            onChangeText={changeTitleHandler} 
            value={enteredTitle}
            style={styles.input}
            />
        </View>
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker onLocationPicked={locationTakenHandler} />
        <Button onPress={savePlaceHandler}>Add Place</Button>
        {/* <Button onPress={savePlaceHandler} style={styles.none}>Add Place</Button> */}
    </ScrollView>
  )
}

export default PlaceForm

const styles = StyleSheet.create({
    form: {
        flex: 1,
        paddingHorizontal: 20,
    },
    label: {
        fontWeight: "bold",
        marginTop: 2,
        marginBottom: 2,
        color: Colors.primary500
    },
    input: {
        marginVertical: 4,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
})