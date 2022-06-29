import {Tile} from "./tile";
import {Image, Text} from "@rneui/themed";
import {StyleSheet, useWindowDimensions, View} from "react-native";
import {VotingButtonBlock} from "./voting";
import {useState} from "react";
import {Chip} from "@rneui/base";
import {masterColors} from "../style/MasterColors";
import {masterStyle} from "../style/MasterStyle";

const chipIconMap = {
    "amusement": "cocktail",
    "cultural": "theater-masks",
    "historical": "landmark",
    "nature": "leaf",
    "sports": "biking",

    "car": "car",
    "plane": "plane",
    "train": "train",
    "biking": "bicycle",
    "boat": "ship"
}



export const SuggestionTile = ({item, voteValue, onUpVote, onDownVote}) => {
    const [unfolded, setUnfolded] = useState(false);

    return <Tile onPress={() => setUnfolded(!unfolded)}>
        <Image
            resizeMethod={'auto'}
            style={[{...styles.preview}, {
                width: useWindowDimensions().width,
                height: useWindowDimensions().height / 4
            }]}
            source={{uri: item.imageUrl}}
        />

        <View style={styles.informationContainer}>
            <View style={styles.chipView}>
                {
                    item.activities.map((activity, index) => {
                    const iconName = chipIconMap[activity.toLowerCase()];
                    return <Chip key={activity} title={activity}
                          buttonStyle={styles.activityChip}
                          titleStyle={[styles.activityChipFont,{fontSize: 14}]}
                          containerStyle={styles.activityChipContainer}
                          icon={{
                              name: iconName,
                              type: 'font-awesome-5',
                              size: 16,
                              color: 'white',
                          }}
                          onPress={() => {}}
                    />
                })}
            </View>
            <View style={styles.chipView}>
                {
                    item.travelModes.map((travelMode, index) => {
                        const iconName = chipIconMap[travelMode.toLowerCase()];
                        return <Chip key={travelMode} title={travelMode}
                                     buttonStyle={styles.travelChip}
                                     titleStyle={[styles.activityChipFont,{fontSize: 14}]}
                                     containerStyle={styles.activityChipContainer}
                                     icon={{
                                         name: iconName,
                                         type: 'font-awesome-5',
                                         size: 16,
                                         color: 'white',
                                     }}
                                     onPress={() => {}}
                        />
                    })}
            </View>
            <Text style={styles.title}>{item.name}</Text>

            <View style={{flexDirection : "row"}}>
                <View style={{flex: 2}}>
                    <Text style={[masterStyle.textStandard,styles.duration]}>{`Costs: ${item.price.currency} ${item.price.amount}`}</Text>
                    <Text style={[masterStyle.textStandard,styles.duration]}>{`Duration: ${item.duration}`}</Text>
                </View>
                <View style={{flex: 1}}>
                    <VotingButtonBlock buttonStyle={styles.votingButton} size={40} style={styles.votingButtonContainer} status={voteValue} onPressUp={onUpVote}
                                   onPressDown={onDownVote}/>
                </View>
            </View>
            <Text numberOfLines={unfolded ? 100 : 5} style={ [masterStyle.textStandard, {color: 'black', fontSize: 16}]}>{item.description}</Text>
        </View>
    </Tile>
}

const styles = StyleSheet.create({

    votingButtonContainer: {
        marginVertical: 15,
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    votingButton: {
        marginLeft: 20,
    },
    title: masterStyle.textTitle,
    price: {
        fontWeight: "bold",
        marginBottom: 10,
    },
    duration: {color: 'black', fontSize: 16, fontWeight : 'bold', marginBottom : 5, marginRight : 10},
    informationContainer: {
        padding: 5,
        marginHorizontal: 30,
        marginBottom: 15,
    },
    activityChipFont: masterStyle.textChipSmall,
    activityChip: {
        backgroundColor: masterColors.activityChipActive,
        marginVertical: 5,
    },
    travelChip: {
        backgroundColor: masterColors.travelChipActive,
        marginVertical: 5,
    },
    activityChipContainer: {
        marginRight: 5,
    },
    chipView: {
        marginTop: 5,
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    }
});
