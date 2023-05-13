import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/colors'

const Button = ({onPress, children}) => {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed]}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: "black",
        shadowOpacity: .15,
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 2,
        borderRadius: 4,
    },
    pressed: {
        opacity: .7,
    },
    text: {
        textAlign: "center",
        fontSize: 16,
        color: Colors.primary50
    },
})