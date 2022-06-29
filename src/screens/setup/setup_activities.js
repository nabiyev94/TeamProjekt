import React, {useContext, useState} from 'react';
import {View,Alert} from 'react-native';
import {PreferencesContext} from "../../components/setup/preferences_context";
import {ActivityChips} from "../../components/setup/ActivityChips"
import {TravelChips} from "../../components/setup/TravelChips";
import {SetupThreeButtons} from "../../components/setup/SetupThreeButtons";

export const SetupActivities = ({route,navigation}) => {
    const {preferences} = route.params;
    const preferencesContext = useContext(PreferencesContext);
    const [activities,updateActivities] = useState({Amusement : false, Sports : false, Cultural : false,
        Historical : false, Nature : false});
    const [travelModes,updateTravelModes] = useState({Car : false, Train : false, Plane : false,
        Biking : false, Boat : false});

    const nextscreen = () => {
        let empty = true;
        for (const [key, value] of Object.entries(activities)) {
            if (value === true) {
                empty = false;
                break;
            }
        }
        if (empty) {
            return Alert.alert('Warning', 'You did not check any activities!');
        }
        empty = true;
        for (const [key, value] of Object.entries(travelModes)) {
            if (value === true) {
                empty = false;
                break;
            }
        }
        if (empty) {
            return Alert.alert('Warning', 'You did not check any travel modes!');
        }
        preferencesContext.activities = activities;
        preferencesContext.travelModes = travelModes;
        preferencesContext.preferences = preferences;
        navigation.navigate("Groups", {preferences : preferences})
    }

    const skip = () => {
        preferencesContext.preferences = preferences;
        navigation.navigate("Groups", {preferences : preferences})
    }

    const resetPreferences = () => {
        updateActivities(activities => ({
            ...activities,
            Amusement: false,
            Sports: false,
            Cultural: false,
            Historical: false,
            Nature: false
        }));
        updateTravelModes(travelModes => ({
            ...travelModes,
            Car : false,
            Train : false,
            Plane : false,
            Biking : false,
            Boat : false
        }))
    }

    return (
        <View style={{flex: 1}}>
            <View style={{marginTop: 20, marginBottom: 20}}>
                <ActivityChips
                    activities = {activities}
                    toggleActivities = {updateActivities}>
                </ActivityChips>
            </View>
            <View style={{marginTop: 20, marginBottom: 20}}>
                <TravelChips
                    travelModes = {travelModes}
                    toggleTravelModes = {updateTravelModes}
                >
                </TravelChips>
            </View>
            <View style ={{flex: 1,
                justifyContent: 'flex-end'}}>
                <SetupThreeButtons
                    preferences={preferences}
                    resetPreferences={resetPreferences}
                    navigation={navigation}
                    nextscreen={nextscreen}
                    skip={skip}
                >
                </SetupThreeButtons>
            </View>
        </View>

    );
};

