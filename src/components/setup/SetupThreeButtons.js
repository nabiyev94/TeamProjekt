import React, {useContext} from 'react';
import {TouchableOpacity, View} from "react-native";
import {masterStyle} from "../style/MasterStyle";
import {Text} from "@rneui/base";
import {PreferencesContext} from "./preferences_context";

export const SetupThreeButtons = ({preferences,resetPreferences,navigation,nextscreen, skip, buttonNames = ["Skip","Reset","Next"]}) => {
    const preferencesContext = useContext(PreferencesContext);

    return(
        <View style={masterStyle.buttonOrder}>
                <TouchableOpacity title={"Skip"}
                                  style={[masterStyle.cancelButton,masterStyle.smallButton]}
                                  onPress={() => {skip()}}
                >
                    <Text style={masterStyle.cancelButtonText}>{buttonNames[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity title={"Reset"}
                                  style={[masterStyle.resetButton,masterStyle.smallButton]}
                                  onPress={resetPreferences}
                >
                    <Text style={masterStyle.cancelButtonText}>{buttonNames[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity title={"Next"}
                                  style={[masterStyle.affirmButton,masterStyle.smallButton]}
                                  onPress={() => {nextscreen()}}
                >
                    <Text style={masterStyle.textButton}>{buttonNames[2]}</Text>
                </TouchableOpacity>
            </View>
    )
}