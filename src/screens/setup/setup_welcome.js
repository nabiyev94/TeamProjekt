import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from "../../components/Theme";
import {PreferencesContext} from "../../components/setup/preferences_context";
import {masterStyle} from "../../components/style/MasterStyle";

export class SetupWelcome extends Component {
    static contextType = PreferencesContext;

    constructor(props) {
        super(props);
        this.state = {
            preferences: {
                budget: 500,
                distance: 2000,
                openness: 3,
                intensity: 3,
                activities: {Amusement : true, Cultural : true, Historical : true, Nature : true ,Sport : true},
                travelMode: {car: true,plane : true, boat : true, train : true, bike : true}
            },
            activities: {Amusement : true, Cultural : true, Historical : true, Nature : true ,Sport : true},
            travelMode: {car: true,plane : true, boat : true, train : true, bike : true}
        }
    }

    render() {
        return (
            <View style={{flex : 1}}>
                <View style={styles.container}>
                    <Text style={[masterStyle.headerDark,{marginTop: 10, marginBottom: 40}]}>
                        Let the journey begin!
                    </Text>
                    <Text style={[masterStyle.textStandard,{marginBottom: 30}]}>
                        In order to better help you find your next travel destination,
                        we need some information on your preferences.
                    </Text>
                    <Text style = {masterStyle.textStandard}>
                        You can later change these settings at any time and also adjust them individually for each of
                        your travel groups.
                    </Text>
                </View>

                <View style={styles.buttonOrder}>
                        <TouchableOpacity title={"Skip"}
                                          style={[masterStyle.cancelButton,masterStyle.mediumButton]}
                                          onPress={ () => {
                                              this.context.preferences = this.state.preferences;
                                              this.props.navigation.navigate("Groups", {preferences: this.state.preferences})
                                          }}
                        >
                            <Text style={masterStyle.cancelButtonText}>Skip</Text>
                        </TouchableOpacity>
                            <TouchableOpacity title={"Let's do this!"}
                                              style = {[masterStyle.affirmButton,masterStyle.mediumButton]}
                                              onPress={ () => {
                                                  this.context.preferences = this.state.preferences;
                                                  this.props.navigation.navigate("SetupTravel", {preferences: this.state.preferences})
                                              }}
                            >
                                <Text style={masterStyle.textButton}>Let's do this!</Text>
                            </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize : 20,
        fontWeight : "bold",
        margin : 20,
        textAlign : "center"
    },
    body : {
        fontSize : 16
    },
    container: {
        flex : 1,
        margin : 20
    },
    buttonOrder: {
        flexDirection: "row",
        height : 100,
        justifyContent: 'space-between',
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 25,
        alignItems: "center"
    }
});
