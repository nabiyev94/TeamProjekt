import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, Alert, Platform, SafeAreaView, Dimensions} from 'react-native';
import {Text} from '@rneui/base';
import {colors} from "../../components/Theme";
import {masterStyle} from "../../components/style/MasterStyle";

const {width, height} = Dimensions.get("window");

export const GroupTravelPreferences = ({route,navigation}) => {

    return(
        <SafeAreaView style={{flex: 1, position: 'relative'}}>
            <TouchableOpacity style={styles.viewBox} onPress={() => navigation.navigate('SetupTravelGroup', {
            })}>
                <Text style={masterStyle.textStandard}>General</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.viewBox} onPress={() => navigation.navigate('SetupActivitiesGroup', {
            })}>
                <Text style={masterStyle.textStandard}>Activities and Travel</Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    viewBox: {
        width: width,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary
    },
});
