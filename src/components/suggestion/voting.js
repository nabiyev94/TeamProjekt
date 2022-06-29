import {Pressable, View} from "react-native";
import {Icon} from "@rneui/base";
import {masterColors} from "../style/MasterColors";

export const VotingButtonBlock = ({style, buttonStyle, status, onPressUp, onPressDown, size}) => {
    let iconUp = 'thumb-up-outline';
    let iconDown = 'thumb-down-outline';
    if (status === 1) {
        iconUp = 'thumb-up';
    } else if (status === -1) {
        iconDown = 'thumb-down';
    }
    return (
        <View style={style}>
            <Pressable onPress={onPressUp} style={buttonStyle}>
                <Icon size={size} iconStyle={{color: masterColors.affirmColor}} type={"material-community"} name={iconUp}></Icon>
            </Pressable>
            <Pressable onPress={onPressDown} style={buttonStyle}>
                <Icon iconStyle={{color: masterColors.cancelColor}} size={size} type={"material-community"} name={iconDown}></Icon>
            </Pressable>
        </View>
    )
}
