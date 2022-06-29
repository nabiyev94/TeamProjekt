import {Icon} from "@rneui/base";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SuggestionOverview} from "../screens/suggestion/suggestion_overview";
import {ChatScreen} from "../screens/chat/ChatScreen";
import {useState} from "react";
import {StyleSheet} from 'react-native'
import {Map} from "./suggestion/map";
import Groups from "../screens/group/Groups";
import {SuggestionOverviewWrapper} from "./suggestion/suggestion_overview_wrapper";
import {masterColors} from "./style/MasterColors";
import {masterStyle} from "./style/MasterStyle";
import GroupManager from "../screens/group/GroupsManager";

const Tab = createBottomTabNavigator();


export const GroupTabNavigator = ({navigation, route}) => {
    const [filteredPlaces, setPlaces] = useState([]);
    const iconSize = 30;

    return (
        <Tab.Navigator lis initialRouteName={"SuggestionsOverview"}
                       component={SuggestionOverview}
                       screenOptions={{headerShown: false, tabBarShowLabel : false,
                           tabBarStyle: styles.bottomNav}}

        >
            <Tab.Screen name="SuggestionsOverview" options={() => ({
                title: "Destinations",
                tabBarIcon: (props) => <Icon type="font-awesome-5" name="compass" size={iconSize} color={props.color}/>,
                tabBarLabelStyle: masterStyle.tabBarText,
                tabBarActiveTintColor : masterColors.affirmColor,
                tabBarInactiveTintColor : masterColors.cancelColor
            })}
            >{() => <SuggestionOverviewWrapper places={filteredPlaces} setPlaces={setPlaces}></SuggestionOverviewWrapper>}
            </Tab.Screen>

            <Tab.Screen name="Map View"
                        listeners={props => ({
                            focus: () => navigation.setOptions({headerShown: false}),
                            blur: () => navigation.setOptions({headerShown: true})
            })}
                        options={() => ({
                            title: "Map",
                            tabBarIcon: (props) => <Icon type="font-awesome-5" name="map" size={iconSize} color={props.color}/>,
                            tabBarLabelStyle: masterStyle.tabBarText,
                            tabBarActiveTintColor : masterColors.affirmColor,
                            tabBarInactiveTintColor : masterColors.cancelColor
                        })}>{() => <Map places={filteredPlaces}></Map>}
            </Tab.Screen>

            <Tab.Screen name="Home"
                        listeners={props => ({
                            focus: () => navigation.setOptions({headerShown: false}),
                            blur: () => navigation.setOptions({headerShown: true})
                        })}
                        options={() => ({
                            tabBarIcon: (props) => <Icon type="font-awesome-5" name="users" size={iconSize} color={props.color}/>,
                            tabBarLabelStyle: masterStyle.tabBarText,
                            tabBarActiveTintColor : masterColors.affirmColor,
                            tabBarInactiveTintColor : masterColors.cancelColor
                        })}>
                {() => {
                    return (<Groups navigation={navigation} route={route}></Groups>)
                }}
            </Tab.Screen>

            <Tab.Screen name="Chat"
                        component={ChatScreen}
                        listeners={props => ({
                            focus: () => navigation.setOptions({headerShown: false}),
                            blur: () => navigation.setOptions({headerShown: true})
                        })}
                        options={props => ({
                            tabBarIcon: (props) => <Icon type="font-awesome-5" name="comment" size={iconSize} color={props.color}/>,
                            tabBarLabelStyle: masterStyle.tabBarText,
                            tabBarActiveTintColor : masterColors.affirmColor,
                            tabBarInactiveTintColor : masterColors.cancelColor
                        })}>

            </Tab.Screen>

            <Tab.Screen name="Settings"
                        listeners={props => ({
                            focus: () => navigation.setOptions({headerShown: false}),
                            blur: () => navigation.setOptions({headerShown: false}),
                        })}
                        options={props => ({
                            tabBarIcon: (props) => <Icon type="font-awesome-5" name="cog" size={iconSize} color={props.color}/>,
                            tabBarLabelStyle: masterStyle.tabBarText,
                            tabBarActiveTintColor : masterColors.affirmColor,
                            tabBarInactiveTintColor : masterColors.cancelColor
                        })}>{() => <GroupManager navigation={navigation} route={route}></GroupManager>}

            </Tab.Screen>


        </Tab.Navigator>)

}

const styles = StyleSheet.create({
    bottomNav: {paddingHorizontal : 5, paddingVertical : 2, marginBottom : 4,
        marginVertical: 3, backgroundColor : masterColors.tabBar, height: 50}
})
