import {Button} from "@rneui/base";
import {masterColors} from "../style/MasterColors";
import {masterStyle} from "../style/MasterStyle";

export const FilterButton = ({isPressed, children, onPress, style}) => {
    let size = "sm";
    if (isPressed) {
        size = "lg"
    }
    return <Button size={size}
                   color={isPressed ? masterColors.affirmColor : masterColors.cancelColor}
                   style={style}
                   titleStyle={masterStyle.filterButton}
                   onPress={onPress}>{children}</Button>
}
