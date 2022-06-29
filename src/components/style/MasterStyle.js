import {StyleSheet} from "react-native";
import {masterColors} from "./MasterColors";
// Lato_100Thin, Lato_100Thin_Italic, Lato_300Light, Lato_300Light_Italic, Lato_400Regular, Lato_400Regular_Italic,
//     Lato_700Bold, Lato_700Bold_Italic, Lato_900Black, Lato_900Black_Italic

export const masterStyle = StyleSheet.create({
    input : {
        padding : 10,
        marginLeft : 20,
        marginRight : 20,
        fontFamily: 'Lato_400Regular',
        color : masterColors.textStandard,
        backgroundColor : masterColors.backgroundLight
    },
    textStandard: {
        fontSize: 20,
        fontFamily: 'Lato_400Regular',
        color : masterColors.textStandard
    },
    textTitle: {
        fontFamily: 'Lato_700Bold',
        fontSize: 20,
        marginVertical: 10,
        color: 'black'
    },
    textButton: {
        fontSize: 18,
        color: masterColors.textButton,
        textAlign: "center",
        justifyContent : "center",
        fontFamily : "Lato_700Bold"
    },
    affirmButton: {
        padding: 10,
        borderRadius: 5,
        width: "70%",
        backgroundColor : masterColors.affirmColor,
        paddingBottom: 8
    },
    resetButton: {
        padding: 10,
        borderRadius: 5,
        width: "70%",
        backgroundColor : masterColors.resetColor
    },
    backgroundScreen: {
        backgroundColor: masterColors.backgroundLight
    },
    link: {
        fontSize : 18,
        paddingTop : 20,
        textAlign : "center",
        color : masterColors.textLink,
        fontFamily: 'Lato_400Regular'
    },
    headerDark : {
        fontSize: 32,
        fontVariant: [ 'small-caps' ],
        color: "black",
        textAlign : "center",
        fontFamily : 'Lato_700Bold'
    },
    navigatorText : {
        fontFamily : 'Lato_700Bold',
    },
    cancelButton: {
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        width: "70%",
        backgroundColor : masterColors.cancelColor,
    },
    cancelButtonText : {
        fontSize: 18,
        color: masterColors.textButton,
        textAlign: "center",
        justifyContent : "center",
        fontFamily : "Lato_700Bold"

    },
    mediumButton : {
        width : 150,
        height : 70,
        textAlign: "center",
        justifyContent : "center"
    },
    smallButton : {
        width : 100,
        height : 60,
        textAlign: "center",
        justifyContent : "center"
    },
    buttonOrder: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 25,
        marginTop: 25,
        height: 50,
        alignItems: "center",
    },
    textChat: {
        color: masterColors.textChat,
        fontFamily : 'Lato_400Regular',
        fontSize : 18
    },
    timeText: {
        fontFamily : 'Lato_300Light',
        color : masterColors.textTime,
        fontSize : 12
    },

    textChatDay: {
        fontFamily : 'Lato_300Light',
        fontSize : 14,
        color : 'black'
    },
    textError: {
        fontFamily : 'Lato_700Bold',
        margin: 0,
        padding: 0,
        color: 'red',
        fontSize: 20,
        textAlign: "center",
        justifyContent: "center"
    },
    textChipSmall: {
        fontFamily : 'Lato_400Regular',
        fontSize : 14,
        color : 'white'
    },
    filterButton: {
        fontFamily : 'Lato_700Bold',
        fontSize : 16,
        color : 'white',
        marginTop : 2,
        marginBottom : 2
    },
    tabBarText: {
        fontFamily : 'Lato_400Regular',
        fontSize : 14,
        color : 'black',
        marginBottom : 2
    },
    sep: {
        borderBottomColor: masterColors.primaryLight,
        marginHorizontal : 15,
        borderBottomWidth: 1,
        width : 350,
        marginTop : 10
    }
})


