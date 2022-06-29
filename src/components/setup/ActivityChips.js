import React, {useContext, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Chip, Text} from "@rneui/base";
import {colors} from "../Theme";
import {masterStyle} from "../style/MasterStyle";
import {masterColors} from "../style/MasterColors";

export const ActivityChips = ({activities, toggleActivities}) => {

    const toggleActivity = (title) => {
        let state = activities[title]
        toggleActivities(activities => (
            {
                ...activities,
                [title]: !state
            }));
    }

    const ActivityChip = ({title, icon}) => {
        return (
            <Chip title={title}
                  buttonStyle={[styles.activityChip, {
                      backgroundColor: activities[title] ? masterColors.activityChipActive : masterColors.activityChipInactive
                  }]}
                  titleStyle={masterStyle.textButton}
                  containerStyle={styles.activityChipContainer}
                  icon={{
                      name: icon,
                      type: 'font-awesome-5',
                      size: 20,
                      color: 'white',
                  }}
                  onPress={() => toggleActivity(title)}
            />
        )
    };

    return (
        <View style={{alignItems: 'center'}}>
            <Text
                style={[masterStyle.textStandard, {marginBottom: 10}]}>
                Choose your preferred activities!
            </Text>

            <View style={styles.container}>
                <ActivityChip
                    title="Amusement"
                    icon="cocktail"
                >
                </ActivityChip>
                <ActivityChip
                    title="Cultural"
                    icon="theater-masks"
                >
                </ActivityChip>
            </View>
            <View style={styles.container}>
                <ActivityChip
                    title="Historical"
                    icon="landmark"
                >
                </ActivityChip>

            </View>
            <View style={styles.container}>
                <ActivityChip
                    title="Nature"
                    icon="leaf"
                >
                </ActivityChip>
                <ActivityChip
                    title="Sports"
                    icon="biking"
                >
                </ActivityChip>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    affirmButton: {
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        width: "30%",
        backgroundColor: colors.primary
    },
    affirmButtonText: {
        fontSize: 16,
        color: colors.text_light,
        textAlign: "center",
        justifyContent: "center"
    },
    cancelButton: {
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        width: "30%",
        backgroundColor: "grey"
    },
    cancelButtonText: {
        fontSize: 16,
        color: colors.text_light,
        textAlign: "center",
        justifyContent: "center"
    },
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center"
    },

    activityChipFont: {
        color: 'white',
        fontSize: 16
    },
    activityChip: {
        backgroundColor: 'grey'
    },
    activityChipContainer: {
        margin: 5,
        marginBottom: 10,
        marginTop: 10,
        width: 150
    },
    chipHeader: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10
    },
    buttonOrder: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 45,
        height: 50,
        alignItems: "center"
    }

});
