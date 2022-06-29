import React, {useContext, useState} from 'react';
import {PreferencesContext} from "../../components/setup/preferences_context";
import {BudgetSlider} from "../../components/setup/sliders/BudgetSlider";
import {DistanceSlider} from "../../components/setup/sliders/DistanceSlider";
import {IntensitySlider} from "../../components/setup/sliders/IntensitySlider";
import {OpennessSlider} from "../../components/setup/sliders/OpennessSlider";
import {masterStyle} from "../../components/style/MasterStyle";
import {SetupThreeButtons} from "../../components/setup/SetupThreeButtons";

export const SetupTravel = ({route, navigation}) => {
    const preferencesContext = useContext(PreferencesContext);

    const [preferences, setPreferences] = useState({
        budget: 500, distance: 3, openness: 3,
        intensity: 3, activities: {Amusement : true, Cultural : true, Historical : true, Nature : true ,Sport : true},
        travelMode: {car: true, plane: true, boat: true, train: true, bike: true}
    });

    const updatePreferences = (name, value) => {
        setPreferences(preferences => ({
            ...preferences,
            [name]: value
        }));
    };

    const nextScreen = () => {
        preferencesContext.preferences = preferences;
        navigation.navigate("SetupActivities", {preferences: preferences})
    }

    const skip = () => {
        navigation.navigate("Groups", {preferences: preferences})
    }

    const resetPreferences = () => {
        updatePreferences("budget", 500);
        updatePreferences("distance", 2);
        updatePreferences("openness", 3);
        updatePreferences("intensity", 3)
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

            <SetupThreeButtons
                preferences={preferencesContext}
                resetPreferences={resetPreferences}
                navigation={navigation}
                nextscreen={nextScreen}
                skip={skip}
            >
            </SetupThreeButtons>
        </>
    );
};
