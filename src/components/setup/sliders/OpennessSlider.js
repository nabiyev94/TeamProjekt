import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {Icon, Slider, Text} from "@rneui/base";
import {sliderStyles} from "./slidersStyle";
import hexRgb from "hex-rgb";
import {masterColors} from "../../style/MasterColors";

// sliders after doc example: https://reactnativeelements.com/docs/components/slider

export const OpennessSlider = ({preferences,setPreferences}) => {
    const leftColor = hexRgb(masterColors.cancelColor);
    const rightColor = hexRgb(masterColors.affirmColor);

    const opennessString = {
        1 : "Keep it conservative",
        2 : "Just a little bit",
        3 : "I don't know",
        4 : "Feeling curious!",
        5 : "I'll try anything!"
    }
    const levels = Object.keys(opennessString).length

    const interpolateOpenness = ({start, end}) => {
        let k = (preferences.openness - 0.5) / levels;
        return Math.ceil((1 - k) * start + k * end) % 256;
    };

    const colorOpenness = () => {
        let r = interpolateOpenness({start: leftColor.red, end: rightColor.red});
        let g = interpolateOpenness({start: leftColor.green, end: rightColor.green});
        let b = interpolateOpenness({start: leftColor.blue, end: rightColor.blue});
        return `rgb(${r},${g},${b})`;
    };

    return (

        <View style={[sliderStyles.contentView]}>
            <Text style={sliderStyles.subHeader}>I am open to new experiences</Text>
            <Slider
                value={preferences.openness}
                onValueChange={(value) =>{
                    setPreferences(preferences => ({
                        ...preferences,
                        "openness": value
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
                            name="lightbulb"
                            type="font-awesome-5"
                            size={20}
                            reverse
                            containerStyle={{bottom: 20, right: 20}}
                            color={colorOpenness()}
                        />
                    ),
                }}
            />
            <Text style={sliderStyles.sliderValue}>{opennessString[preferences["openness"]]}</Text>
        </View>

    )
}
