import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Platform,
    Alert,
    LogBox
} from 'react-native';
import {colors} from '../../components/Theme';
import {useGroup} from '../../components/group/group_context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {masterStyle} from "../../components/style/MasterStyle";
import {masterColors} from "../../components/style/MasterColors";

const {width, height} = Dimensions.get("window");


const GroupManager = ({navigation, route}) => {

    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state',]);


    const {data} = route.params;

    const [show, setShow] = useState(false)
    const [dateVal, setDateVal] = useState(new Date(data.date))
    const [save, setSave] = useState(false)

    const {groups, setgroups} = useGroup()


    useEffect(() => {
        if (save) {
            AsyncStorage.setItem('groups', JSON.stringify(groups)).then((res) => {
                console.log(groups, 'farigh', 'runned')
            }).catch((error) => {
                console.log(error);
                Alert.alert("Error", error.message);
            })
        }
    }, [save])


    return (
        <SafeAreaView style={{backgroundColor: masterColors.backgroundLight, flex: 1}}>
            <TouchableOpacity style={styles.viewBox} onPress={() => navigation.navigate('EditGroup', {
                data: data,
            })}>
                <Text style={masterStyle.textStandard}>Manage Group</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewBox} onPress={() => navigation.navigate('Calendar', {
                groupdata: data,
            })}>
                <Text style={masterStyle.textStandard}> Travel Date</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewBox} onPress={() => navigation.navigate("GroupTravelPreferences")}>
                <Text style={masterStyle.textStandard}> Group Travel Preferences</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default GroupManager;

const styles = StyleSheet.create({
    viewBox: {
        width: width,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary
    },
    viewBoxTwo: {
        width: width,
        padding: 20,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: colors.primary
    },
});
