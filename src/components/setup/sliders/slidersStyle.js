import {StyleSheet} from "react-native";
import {masterStyle} from "../../style/MasterStyle";

export const sliderStyles = StyleSheet.create({
    contentView: {
        padding: 12,
        paddingLeft: 25,
        paddingRight: 25,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    subHeader: {
        color : "black",
        textAlign : "center",
        paddingVertical : 5,
        marginBottom : 5,
        fontSize : 18,
        fontFamily : masterStyle.textStandard.fontFamily
    },
    sliderValue: {
        fontSize : 18,
        paddingTop: 5,
        textAlign : "center",
        justifyContent : "center",
        fontFamily : 'Lato_300Light_Italic'
    }
});
