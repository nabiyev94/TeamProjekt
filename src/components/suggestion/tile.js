import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {masterColors} from "../style/MasterColors";

/**
 * @param onPress
 * @param children
 * @param style
 * @param cardStyle
 * @returns {JSX.Element}
 * @constructor
 */
export const Tile = ({onPress, children, style, cardStyle}) => {
    return (
        <View style={[{...styles.item}, cardStyle]}>
            <Pressable style={[{...styles.pressable}, style]} onPress={onPress}>
                {children}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: masterColors.backgroundDark,
        margin: 10,
        borderRadius: 5,
    },
    pressable: {
        backgroundColor: 'transparent',
        color: 'transparent',
    },
});
