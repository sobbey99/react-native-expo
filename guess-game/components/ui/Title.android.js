import { Text, StyleSheet, Platform } from "react-native"
import Colors from "../../constants/colors"


function Title({children}) {
    return <Text style={styles.title}>{children}</Text>
}

export default Title

const styles = StyleSheet.create({
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 24,
        color: "white",
        textAlign: "center",
        // // borderWidth: Platform.OS === "ios" ? 2 : 0,
        // borderWidth: Platform.select({ios:2, android: 4}),
        borderWidth: 4,
        borderColor: "white",
        padding: 7,
        maxWidth: "80%",
        width: 300,
    }
})