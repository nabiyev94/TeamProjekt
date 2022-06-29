import React, {useContext, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {Chip, Text} from "@rneui/base";
import {masterColors} from "../style/MasterColors";
import {masterStyle} from "../style/MasterStyle";

export const TravelChips = ({travelModes,toggleTravelModes}) => {

    const toggleTravelMode = (title) => {
        let state = travelModes[title]
        toggleTravelModes(travelModes => (
            {
                ...travelModes,
                [title]: !state
            }));
    }

    const TravelChip = ({ title, icon}) => {
        return (
            <Chip title= {title}
                  buttonStyle= {[styles.activityChip, {
                      backgroundColor : travelModes[title] ? masterColors.travelChipActive : masterColors.travelChipInactive}]}
                  titleStyle = {masterStyle.textButton}
                  containerStyle = {styles.activityChipContainer}
                  icon={{
                      name: icon,
                      type: 'font-awesome-5',
                      size: 20,
                      color: 'white',
                  }}
                  onPress={() => {toggleTravelMode(title)
                  }}
            />
        )
    };

    return (
        <View style={{alignItems : "center"}}>
            <Text style={[masterStyle.textStandard, {marginBottom : 10}]}>
                Choose your preferred mode of travel!
            </Text>
            <View style = {styles.container}>
                <TravelChip
                    title = "Car"
                    icon = "car"
                >
                </TravelChip>
                <TravelChip
                    title = "Plane"
                    icon = "plane"
                >
                </TravelChip>
            </View>
            <View style = {styles.container}>
                <TravelChip
                    title = "Train"
                    icon = "train"
                >
                </TravelChip>
            </View>

            <View style = {styles.container}>
                <TravelChip
                    title = "Biking"
                    icon = "bicycle"
                >
                </TravelChip>
                <TravelChip
                    title = "Boat"
                    icon = "ship"
                >
                </TravelChip>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection : "row",
        alignItems : "flex-start",
        justifyContent : "center"
    },
    activityChip: {
        backgroundColor:'grey'
    },
    activityChipContainer: {
        margin: 5,
        marginBottom: 10,
        marginTop: 10,
        width : 150
    }
});
