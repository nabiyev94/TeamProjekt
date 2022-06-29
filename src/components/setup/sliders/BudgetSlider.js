import React, {useContext, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Chip, Icon, Slider, Text} from "@rneui/base";
import {colors} from "../../Theme";
import {sliderStyles} from "./slidersStyle";
import {masterStyle} from "../../style/MasterStyle";
import hexRgb from 'hex-rgb';
import {masterColors} from "../../style/MasterColors";

// sliders after doc example: https://reactnativeelements.com/docs/components/slider

export const BudgetSlider = ({preferences,setPreferences}) => {
    const maxBudget = 2500;
    const minBudget = 0;
    const stepsize = 100;
    const leftColor = hexRgb(masterColors.cancelColor);
    const rightColor = hexRgb(masterColors.affirmColor);

    const interpolateBudget = ({start, end}) => {
        let k = preferences.budget / maxBudget;
        return Math.ceil((1 - k) * start + k * end) % 256;
    };

    const colorBudget = () => {
        let r = interpolateBudget({start: leftColor.red, end: rightColor.red});
        let g = interpolateBudget({start: leftColor.green, end: rightColor.green});
        let b = interpolateBudget({start: leftColor.blue, end: rightColor.blue});
        return `rgb(${r},${g},${b})`;
    };

    return (
        <View style={[styles.contentView]}>
            <Text style={styles.subHeader}>How much money I want to spend</Text>
            <Slider
                value={preferences.budget}
                onValueChange={(value) =>{
                    setPreferences(preferences => ({
                        ...preferences,
                        "budget": value
                    }));
                }}
                maximumValue={maxBudget}
                minimumValue={minBudget}
                step={stepsize}
                allowTouchTrack
                trackStyle={{height: 5, backgroundColor: 'transparent'}}
                thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
                thumbProps={{
                    children: (
                        <Icon
                            name="euro"
                            type="font-awesome"
                            size={20}
                            reverse
                            containerStyle={{bottom: 20, right: 20}}
                            color={colorBudget()}
                        />
                    ),
                }}
            />
            <Text style={styles.sliderValue}>{preferences["budget"] + "€"}</Text>
        </View>
    )
}

const styles = sliderStyles
