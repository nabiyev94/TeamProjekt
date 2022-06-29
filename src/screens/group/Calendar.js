import React, { Component,useState,useEffect } from 'react'
import {Text, View, TouchableOpacity, StyleSheet, SafeAreaView,Platform} from 'react-native'
import { useGroup } from '../../components/group/group_context'
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateItem } from '../../utils/utilfunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {masterStyle} from "../../components/style/MasterStyle";


const Dates = ({navigation,route}) => {

    const {groupdata} = route.params;



    const {traveldates,settraveldates,groups,setgroups} = useGroup()

    const [isPickerShow, setIsPickerShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [save,setsave] = useState(false);

    useEffect(() => {
            if(traveldates.length > 0){
                updateItem(groupdata.id,'traveldates',traveldates,groups, setgroups)
                AsyncStorage.setItem('groups', JSON.stringify(groups)).then((res) => {
                    setDate(new Date())
                }).catch((error) => {
                    console.log(error);
                    Alert.alert("Error", error.message);
                })
            }
    }, [save])

    const showPicker = () => {
        setIsPickerShow(true);
    };

    const onChange = (event, value) => {
        if (event.type === 'set') {
            console.log(value,'value');
        setIsPickerShow(false);
        setDate(value);
        settraveldates([...traveldates,value])
        setsave(!save)
        }else{
            setIsPickerShow(false);
        }
    };

    console.log(date,'date')



        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <Text style={[masterStyle.textStandard, styles.text]}>You can select here multiple dates, see them with other members' wish dates in Manage Group and discuss the common trip date in Chat</Text>
                    <TouchableOpacity
                        style = {masterStyle.affirmButton}
                        onPress={showPicker}
                    >
                            <Text style={masterStyle.textButton}>Select preferred trip dates</Text>
                    </TouchableOpacity>
                </View>
                {isPickerShow && (
                <DateTimePicker
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onChange}
                    style={styles.datePicker}
                />
            )}
            </SafeAreaView>
        )



}


export default Dates

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        margin: 10,
        alignSelf: "center",
    },
    text: {
        marginBottom: 30,
    }
})
