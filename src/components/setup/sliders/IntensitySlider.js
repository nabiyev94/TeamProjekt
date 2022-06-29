import React, {useContext, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Chip, Icon, Slider, Text} from "@rneui/base";
import {colors} from "../../Theme";
import {sliderStyles} from "./slidersStyle";
import hexRgb from "hex-rgb";
import {masterColors} from "../../style/MasterColors";

// sliders after doc example: https://reactnativeelements.com/docs/components/slider

export const IntensitySlider = ({preferences,setPreferences}) => {
    const styles = sliderStyles
    const leftColor = hexRgb(masterColors.cancelColor);
    const rightColor = hexRgb(masterColors.affirmColor);

    const intensityLevelString= {
        1 : "Just let me relax",
        2 : "Keep it leisurely",
        3 : "I like to move around. Sometimes.",
        4 : "Keep a high pace",
        5 : "Give me some adrenalin"
    }

    const levels = Object.keys(intensityLevelString).length

    const colorIntensity = () => {
        let r = interpolateIntensity({start: leftColor.red, end: rightColor.red});
        let g = interpolateIntensity({start: leftColor.green, end: rightColor.green});
        let b = interpolateIntensity({start: leftColor.blue, end: rightColor.blue});
        return `rgb(${r},${g},${b})`;
    };

    const interpolateIntensity = ({start, end}) => {
        let k = preferences.intensity / levels;
        return Math.ceil((1 - k) * start + k * end) % 256;
    };

    return(
        <View style={[styles.contentView]}>
            <Text style={styles.subHeader}>I am a very active person</Text>
            <Slider
                value={preferences.intensity}
                onValueChange={(value) =>{
                    setPreferences(preferences => ({
                        ...preferences,
                        "intensity": value
                    }));
                }}
                maximumValue={levels}
                minimumValue={1}
                step={1}
                allowTouchTrack
                trackStyle={{height: 5, backgroundColor: 'transparent'}}
                thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
                thumbProps={{
                    children: (
                        <Icon
                            name="walking"
                            type="font-awesome-5"
                            size={20}
                            reverse
                            containerStyle={{bottom: 20, right: 20}}
                            color={colorIntensity()}
                        />
                    ),
                }}
            />
            <Text style={styles.sliderValue}>{intensityLevelString[preferences["intensity"]]}</Text>
        </View>
    )
}

