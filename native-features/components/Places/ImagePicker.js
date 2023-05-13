import { View, Text, Alert, Image, StyleSheet} from 'react-native'
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from "expo-image-picker"
import { useState } from 'react'

import {Colors} from "../../constants/colors"
import OutlinedButton from '../UI/OutlinedButton'

const ImagePicker = ({onImageTaken}) => {
  const [pickedImage, setPickedImage] = useState()

  const [cameraPermInfo, requestPermFunc] = useCameraPermissions()

  async function verifyPerm() {
    try {
      if (cameraPermInfo.status === PermissionStatus.UNDETERMINED) {
        const permRes = await requestPermFunc();
        return permRes.granted;
      }
  
      if (cameraPermInfo.status === PermissionStatus.DENIED) {
        Alert.alert(
          "Insufficient Permissions!", 
          "You need to grant camera permissions to use this app"
        );
        const permRes = await requestPermFunc();
        return permRes.granted;
        // return false;
      }
  
      return true;
    } catch (error) {
      console.log("Error requesting camera permission:", error);
      return false;
    }
  }

  async function takeImageHandler() {
    const hasPerm = await verifyPerm()
    if(!hasPerm) {
      return
    }
  
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16,9],
      quality: 0.5,
    })
  
    if (image.canceled) {
      // User cancelled the image picker
      return;
    }
  
    if (!image.assets || image.assets.length === 0) {
      // Image assets are null or empty
      Alert.alert("Error", "Failed to pick an image. Please try again.");
      return;
    }
    
    setPickedImage(image.assets[0].uri)
    onImageTaken(image.assets[0].uri)
  }


    let imgPreview = <Text>No image taken yet.</Text>

    if (pickedImage) {
      imgPreview = <Image source={{ uri: pickedImage}} style={styles.image}/>
    }

  return (
   <View>
     <View style={styles.imgPreview}>
      {imgPreview}
    </View>
    <OutlinedButton 
     icon="camera"
     onPress={takeImageHandler}
    >
      Take Image
    </OutlinedButton>
   </View>
  )
}

export default ImagePicker

const styles = StyleSheet.create({
  imgPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%"
  }
})