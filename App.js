import {StatusBar, StyleSheet, useColorScheme, SafeAreaView, Pressable} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Registration} from "./src/screens/login/registration";
import {Login} from "./src/screens/login/login";
import {PasswordRecovery} from "./src/screens/login/password_recovery";
import {SetupWelcome} from "./src/screens/setup/setup_welcome";
import {SetupTravel} from "./src/screens/setup/setup_travel"
import {SetupActivities} from "./src/screens/setup/setup_activities";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {PlacesApiContext} from "./src/components/suggestion/places_api_context";
import {PlacesApi} from "./src/components/suggestion/places_api";
import {SetupActivitiesGroup} from "./src/screens/group/preferences/setup_activities_group";
import CreateGroup from "./src/screens/group/CreateGroup";
import GroupManager from "./src/screens/group/GroupsManager";
import EditGroup from "./src/screens/group/EditGroup";
import Groups from "./src/screens/group/Groups";
import {GroupTravelPreferences} from "./src/screens/group/GroupTravelPreferences"
import {GroupContext} from "./src/components/group/group_context";
import {GroupTabNavigator} from "./src/components/tab_navigator";
import {SetupTravelGroup} from "./src/screens/group/preferences/setup_travel_group"
import {PreferencesContext} from "./src/components/setup/preferences_context";
import Calendar from "./src/screens/group/Calendar";
import {masterColors} from "./src/components/style/MasterColors";
import AppLoading from 'expo-app-loading';
import {useFonts, Lato_100Thin, Lato_100Thin_Italic, Lato_300Light, Lato_300Light_Italic, Lato_400Regular, Lato_400Regular_Italic,
    Lato_700Bold, Lato_700Bold_Italic, Lato_900Black, Lato_900Black_Italic,
} from '@expo-google-fonts/lato';
import {masterStyle} from "./src/components/style/MasterStyle";
import {VotingContextProvider} from "./src/components/suggestion/voting_context_provider";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LogBox } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    let [fontsLoadedLato] = useFonts({
        Lato_100Thin, Lato_100Thin_Italic, Lato_300Light, Lato_300Light_Italic, Lato_400Regular,
        Lato_400Regular_Italic, Lato_700Bold, Lato_700Bold_Italic, Lato_900Black, Lato_900Black_Italic,
    });

    if (!fontsLoadedLato) {
        return <AppLoading />;
    } else {
    return (
            <PlacesApiContext.Provider value={new PlacesApi()}>
                <PreferencesContext.Provider value={{preferences: []}}>
                    <GroupContext>
                        <VotingContextProvider>
                            <NavigationContainer>
                                <SafeAreaView style={[styles.container, backgroundStyle]}>
                                    <StatusBar
                                        barStyle={
                                        isDarkMode ? 'light-content' : 'dark-content'
                                        }
                                    />
                                    <Stack.Navigator initialRouteName={'Login'}
                                             screenOptions={{
                                                 contentStyle:{
                                                     backgroundColor:masterColors.backgroundLight},
                                                 headerStyle : {
                                                     backgroundColor : masterColors.headerDark
                                                 },
                                                 headerTintColor : '#ffffff',
                                             headerTitleStyle : masterStyle.navigatorText}}
                                    >
                                <Stack.Screen name="CreateGroup" options={{title: 'Create Your Group'}}
                                              component={CreateGroup}/>
                                <Stack.Screen name="GroupManager"
                                              component={GroupManager}/>
                                <Stack.Screen name="EditGroup" options={{title: 'Edit Group'}} component={EditGroup}/>
                                <Stack.Screen name={'Suggestions'}
                                              component={GroupTabNavigator}
                                >
                                </Stack.Screen>
                                <Stack.Screen
                                    name={"GroupTravelPreferences"}
                                    component={GroupTravelPreferences}
                                    options={{
                                        title: "Travel preferences"
                                    }}
                                />
                                <Stack.Screen name={"SetupActivitiesGroup"}
                                              component={SetupActivitiesGroup}
                                              options={{
                                                  title: "Group Activities & Travel"
                                              }}
                                />
                                <Stack.Screen name={"SetupTravelGroup"}
                                              component={SetupTravelGroup}
                                              options={{
                                                  title: "Group Travel Settings"
                                              }}
                                />
                                <Stack.Screen
                                    name="Login"
                                    component={Login}
                                    options={{
                                        headerShown: false
                                    }}

                                />
                                <Stack.Screen
                                    name="Registration"
                                    component={Registration}
                                />
                                <Stack.Screen
                                    name="PasswordRecovery"
                                    component={PasswordRecovery}
                                    options={{
                                        title: "Recover your password"
                                    }}
                                />
                                <Stack.Screen
                                    name="SetupWelcome"
                                    component={SetupWelcome}
                                    options={{
                                        title: "Welcome to Travel Aid"
                                    }}
                                />
                                <Stack.Screen
                                    name="SetupTravel"
                                    component={SetupTravel}
                                    options={{
                                        title: "Travel preferences"
                                    }}
                                />
                                <Stack.Screen
                                    name="SetupActivities"
                                    component={SetupActivities}
                                    options={{
                                        title: "Activities & travel mode"
                                    }}
                                />
                                <Stack.Screen
                                    name="Groups"
                                    component={Groups}
                                    options={{title: 'My Groups'}}
                                />
                                <Stack.Screen
                                    name="Calendar"
                                    component={Calendar}
                                    options={{title: 'Calendar'}}
                                />

                            </Stack.Navigator>
                        </SafeAreaView>
                    </NavigationContainer>
                </VotingContextProvider>
            </GroupContext>
        </PreferencesContext.Provider>
    </PlacesApiContext.Provider>
    )}
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffc2c2',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        marginLeft: 10,
        color: Colors.black,
    },
    headerTitleText: {
        fontWeight: '600',
        fontSize: 18,
        color: Colors.black,
        marginHorizontal: 5,
    },
    votes: {
        marginHorizontal: 10,
    },
});
