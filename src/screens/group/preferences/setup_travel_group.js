import React, {useContext, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Slider, Text, Icon} from '@rneui/base';
import {PreferencesContext} from "../../../components/setup/preferences_context";
import {colors} from "../../../components/Theme";
import {BudgetSlider} from "../../../components/setup/sliders/BudgetSlider";
import {DistanceSlider} from "../../../components/setup/sliders/DistanceSlider";
import {IntensitySlider} from "../../../components/setup/sliders/IntensitySlider";
import {OpennessSlider} from "../../../components/setup/sliders/OpennessSlider";
import {SetupThreeButtons} from "../../../components/setup/SetupThreeButtons";

export const SetupTravelGroup = ({route,navigation}) => {
    const preferencesContext = useContext(PreferencesContext);

    const [preferences, setPreferences] = useState(preferencesContext.preferences);

    const updatePreferences = (name,value) => {
        setPreferences(preferences => ({
            ...preferences,
            [name]: value
        }));
    };

    const resetPreferences = () => {
        updatePreferences("budget", 500);
        updatePreferences("distance", 2);
        updatePreferences("openness", 3);
        updatePreferences("intensity", 3)
    }

    const nextscreen = () => {
        preferencesContext.preferences = preferences;
        navigation.navigate("GroupTravelPreferences")
    }

    const skip = () => {
        navigation.navigate("GroupTravelPreferences");
    }

    return (
        <>
            <BudgetSlider
                preferences={preferences}
                setPreferences={setPreferences}
            >
            </BudgetSlider>

            <DistanceSlider
                preferences={preferences}
                setPreferences={setPreferences}
            >
            </DistanceSlider>

            <OpennessSlider
                preferences={preferences}
                setPreferences={setPreferences}
            >
            </OpennessSlider>
            <IntensitySlider
                preferences={preferences}
                setPreferences={setPreferences}
            >

            </IntensitySlider>

            <View style ={{
                flex: 1,
                justifyContent: 'flex-end'}}>
                <SetupThreeButtons
                    preferences={[]}
                    resetPreferences={resetPreferences}
                    navigation={navigation}
                    nextscreen={nextscreen}
                    buttonNames={["Cancel","Reset","Save"]}
                    skip={skip}
                >
                </SetupThreeButtons>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    contentView: {
        padding: 12,
        paddingLeft: 25,
        paddingRight: 25,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    buttonOrder: {
        flex : 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 25,
        marginTop: 25,
        height: 50,
        alignItems : "center"
    },
    affirmButton: {
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        width: "30%",
        backgroundColor : colors.primary
    },
    affirmButtonText : {
        fontSize: 16,
        color: colors.text_light,
        textAlign: "center",
        justifyContent : "center"
    },
    cancelButton: {
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        width: "30%",
        backgroundColor : "grey"
    },
    cancelButtonText : {
        fontSize: 16,
        color: colors.text_light,
        textAlign: "center",
        justifyContent : "center"
    }
});
