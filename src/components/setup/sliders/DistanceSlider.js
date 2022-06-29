import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {Icon, Slider, Text} from "@rneui/base";
import {sliderStyles} from "./slidersStyle";
import hexRgb from "hex-rgb";
import {masterColors} from "../../style/MasterColors";

// sliders after doc example: https://reactnativeelements.com/docs/components/slider


export const DistanceSlider = ({preferences,setPreferences}) => {

    const minDistance = 1;
    const maxDistance = 48;
    const stepsize = 1;
    const leftColor = hexRgb(masterColors.cancelColor);
    const rightColor = hexRgb(masterColors.affirmColor);

    const interpolateDistance = ({start, end}) => {
        let k = (preferences.distance - minDistance) / maxDistance;
        return Math.ceil((1 - k) * start + k * end) % 256;
    };

    const colorDistance = () => {
        let r = interpolateDistance({start: leftColor.red, end: rightColor.red});
        let g = interpolateDistance({start: leftColor.green, end: rightColor.green});
        let b = interpolateDistance({start: leftColor.blue, end: rightColor.blue});
        return `rgb(${r},${g},${b})`;
    };

    return(
        <View style={[styles.contentView]}>
            <Text style={styles.subHeader}>How far I want to travel</Text>
            <Slider
                value={preferences.distance}
                onValueChange={(value) =>{
                    setPreferences(preferences => ({
                        ...preferences,
                        "distance": value
                    }));
                }}
                maximumValue={maxDistance}
                minimumValue={minDistance}
                step={stepsize}
                allowTouchTrack
                trackStyle={{height: 5, backgroundColor: 'transparent'}}
                thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
                thumbProps={{
                    children: (
                        <Icon
                            name="route"
                            type="font-awesome-5"
                            size={20}
                            reverse
                            containerStyle={{bottom: 20, right: 20}}
                            color={colorDistance()}
                        />
                    ),
                }}
            />
            <Text style={styles.sliderValue}>{"no more than " + preferences["distance"] + " hours"}</Text>
        </View>
    )

}

const styles = sliderStyles
