import React, {useContext, useState} from 'react';
import {View, Alert} from 'react-native';
import {PreferencesContext} from "../../../components/setup/preferences_context"
import {ActivityChips} from "../../../components/setup/ActivityChips"
import {TravelChips} from "../../../components/setup/TravelChips";
import {SetupThreeButtons} from "../../../components/setup/SetupThreeButtons";


export const SetupActivitiesGroup = ({route,navigation}) => {
    //const {preferences} = route.params;
    const preferencesContext = useContext(PreferencesContext);
    //const [activities,updateActivities] = useState({Amusement : false, Sports : false, Cultural : false,
    //    Historical : false, Nature : false});
    const [activities,updateActivities] = useState({...preferencesContext.activities})
    const [travelModes,updateTravelModes] = useState({...preferencesContext.travelModes});

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
        preferencesContext.travelModes = travelModes
        navigation.navigate("GroupTravelPreferences")
    }

    const skip = () =>{
        navigation.navigate("GroupTravelPreferences");
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
            <View style={{marginTop: 25, marginBottom: 20}}>
                <ActivityChips
                    activities = {activities}
                    toggleActivities = {updateActivities}>
                </ActivityChips>

                <TravelChips
                    travelModes = {travelModes}
                    toggleTravelModes = {updateTravelModes}
                >
                </TravelChips>
            </View>
            <View style ={{
                flex: 1,
                justifyContent: 'flex-end'}}>
                <SetupThreeButtons
                    preferences={preferencesContext}
                    resetPreferences={resetPreferences}
                    navigation={navigation}
                    nextscreen={nextscreen}
                    buttonNames={["Cancel","Reset","Save"]}
                    skip={skip}
                >
                </SetupThreeButtons>
            </View>
        </View>
    );
};
