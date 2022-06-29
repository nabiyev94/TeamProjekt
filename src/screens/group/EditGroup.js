import React, {useState, useEffect, useRef} from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    SafeAreaView,
    View,
    Alert,
    Dimensions,
    LogBox,
    Modal,
    Image,
    ScrollView,
    Animated,
    Easing,
} from "react-native";
import {TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {colors} from "../../components/Theme";
import {useGroup} from "../../components/group/group_context";
import {updateItem} from "../../utils/utilfunctions";
import {images} from "../../utils/utilfunctions";
import {useNavigation} from "@react-navigation/native";
import {Icon} from "@rneui/base";
import {masterStyle} from "../../components/style/MasterStyle";
import {masterColors} from "../../components/style/MasterColors";


const {width} = Dimensions.get("window");

const EditGroup = ({navigation, route}) => {
    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state',]);

    const {data} = route.params;

    const height = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;


    const {groups, setgroups} = useGroup()
    const [deletee, setdeletee] = useState(false)
    const [value, setValue] = useState(data.groupName ? data.groupName : '')
    const [visible, setVisible] = useState(false)
    const [add, setAdd] = useState(false)
    const [email, setEmail] = useState('')
    const [mem, setMem] = useState(data.groupMembers.length > 0 ? data.groupMembers : [])
    const [isSelectImage, setSelectImage] = useState(false);

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


    useEffect(() => {
        if (add) {
            updateItem(data.id, 'groupMembers', mem, groups, setgroups)
            AsyncStorage.setItem('groups', JSON.stringify(groups)).then((res) => {
                setAdd(false)
            }).catch((error) => {
                console.log(error);
                Alert.alert("Error", error.message);
            })
        }
    }, [add])

    useEffect(() => {
        if (deletee) {
            setgroups(groups.filter(item => item.id !== data.id))
            AsyncStorage.setItem('groups', JSON.stringify(groups)).then((res) => {
                navigation.navigate('Groups')
            }).catch((error) => {
                console.log(error);
                Alert.alert("Error", error.message);
            })
        }
    }, [deletee])

    console.log(groups, 'groups');


    const editGroupName = () => {
        updateItem(data.id, 'groupName', value, groups, setgroups)
        Alert.alert("Successfully Updated", 'Group Name Updated Successfully')
        setAdd(true)
    }

    navigation = useNavigation()
    const deleteroup = () => {
        setgroups((prevstate) => prevstate.filter(item => item.id !== data.id))
        setdeletee(true)
        navigation.navigate('Groups')
    }


    const deleteGroup = () => {
        Alert.alert(
            "Delete Group",
            "Are you sure that you want to leave this group?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {text: "OK", onPress: () => deleteroup()},
            ],
            {cancelable: false}
        );
    }

    const addNewMember = () => {
        if (email.length === 0) {
            return Alert.alert('Warning', 'Please Enter Email')
        }
        if (!validateEmail(email)) {
            return Alert.alert('Warning', 'Please Enter Valid Email')
        }

        if (mem.includes(email)) {
            return Alert.alert('Warning', 'Member Already Exists')
        }

        setMem([...mem, email])
        setEmail('')
        setAdd(true)
        Alert.alert('Success', 'Member Added Successfully')
        setVisible(false)
    }


    const maxHeight = height.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 300]
    });

    const toggleImageSelection = () => {
        if (isSelectImage) {
            showheight(opacity, height,0);
            setSelectImage(false);
        } else {
            showheight(height, opacity, 1);
            setSelectImage(true);


        }
    }

    const showheight = (animateFirst, animateSecond, val) => {
        Animated.timing(animateFirst, {
            toValue: val,
            duration: 0,
            easing: Easing.linear,
            useNativeDriver: false
        }).start(() => {
            Animated.timing(animateSecond, {
                toValue: val,
                duration: 0,
                easing: Easing.linear,
                useNativeDriver: false
            }).start();
        });
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView contentContainerStyle={{alignItems : 'center'}}>

                <View style={[styles.container]}>
                    <Text style={[masterStyle.textTitle, {textAlign: "center"}]}>Rename Group</Text>
                    <TextInput
                        placeholder="Enter Group Name"
                        placeholderTextColor={"#d3d3d3"}
                        style={[styles.formInput, {height: 40, width: 350, backgroundColor : 'white'}]}
                        value={value}
                        onChangeText={(value) => setValue(value)}
                    />
                    <View>
                        <TouchableOpacity
                            style={[masterStyle.affirmButton,{width: 250}]}
                            activeOpacity={0.5}
                            onPress={editGroupName}
                        >
                            <Text style={masterStyle.textButton}>Set new group name</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={masterStyle.sep}/>

                <View style={styles.container}>
                    <Text style={[masterStyle.textTitle]}>Edit Group Photo</Text>
                    <TouchableOpacity
                        onPress={() => {
                            toggleImageSelection()
                        }}
                    >
                        <Image
                            source={data.image}
                            style={styles.images}
                        />
                    </TouchableOpacity>
                </View>

                <Animated.View style={{height: maxHeight, opacity: opacity}}>
                    <View style={styles.gridview}>
                        {images?.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        updateItem(data.id, 'image', item, groups, setgroups)
                                        setAdd(true)
                                    }}
                                >
                                    <Image
                                        source={item}
                                        style={styles.images}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <View style={{flexDirection: "row", alignSelf: "center"}}>
                        <TouchableOpacity
                            onPress={() => toggleImageSelection()}
                            style={masterStyle.cancelButton}
                        >
                            <Text style={[masterStyle.textStandard, {textAlign: "center"}]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                <View style={masterStyle.sep}/>

                <View style={styles.containerTwo}>
                    <Text style={[masterStyle.textTitle, {textAlign: "center", marginBottom : 0}]}>Group Members</Text>

                    {data.groupMembers.length === 0 && (

                        <View style={styles.memberChip}>
                            <Text style={masterStyle.textStandard}>No Members</Text>
                        </View>
                    )}
                    {data.groupMembers.length > 0 && data.groupMembers.map((e, i) => {
                        return (
                            <View style={styles.memberChip} key={i}>
                                <Text style={masterStyle.textStandard}>{e}</Text>
                            </View>
                        )
                    })}
                    <TouchableOpacity onPress={() => setVisible(!visible)}
                                      style={[masterStyle.affirmButton, {flexDirection: "row", justifyContent: "space-evenly",
                                          marginTop: 10, width : 250}]}>
                        <Text style={[masterStyle.textButton, {marginRight: 8}]}>Invite Member</Text>
                        <Icon type={"antdesign"} name={"pluscircle"} size={18} iconStyle={masterStyle.textButton}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={masterStyle.sep}/>
                <Text style={[masterStyle.textTitle, {textAlign: "center"}]}>Possible Trip Dates</Text>
                <View style={styles.containerTwo}>
                    {data?.traveldates?.length === 0 && (

                        <View style={styles.memberChip}>
                            <Text style={masterStyle.textStandard}>No Travel Dates yet</Text>
                        </View>

                    )}
                    {data?.traveldates?.length > 0 && data?.traveldates?.map((e, i) => {
                        return (
                            <View style={styles.memberChip} key={i}>
                                <Text style={masterStyle.textStandard}>{new Date(e).toDateString()}</Text>
                            </View>
                        )
                    })}

                    <View>
                        <TouchableOpacity style={[masterStyle.affirmButton, {flexDirection: "row", justifyContent: "space-evenly",
                            marginTop: 5, alignSelf: "center", width : 250}]} onPress={deleteGroup}>
                            <Text style={[masterStyle.textButton]}>Leave Group</Text>
                            <Icon type={"entypo"} name={"log-out"} size={18} iconStyle={masterStyle.textButton}></Icon>
                        </TouchableOpacity>
                    </View>


                </View>

                <View>
                    <Modal
                        isVisible={visible}
                        visible={visible}
                        onRequestClose={() => setVisible(!visible)}
                        style={styles.modalView}
                    >
                        <View style={{flex: 1, backgroundColor: masterColors.backgroundLight, marginTop : 5}}>
                            <View style={styles.container}>
                                    <Text style={masterStyle.textTitle}>Invite New Member</Text>
                                <TextInput
                                    placeholder="Enter an e-mail address"
                                    placeholderTextColor={"#d3d3d3"}
                                    style={[styles.formInput, {width: "90%", backgroundColor : 'white'}]}
                                    value={email}
                                    onChangeText={(value) => setEmail(value)}
                                />
                                <View style={{flexDirection: "row", alignContent: "space-between"}}>
                                    <View style={[masterStyle.buttonOrder]}>
                                        <TouchableOpacity
                                            style={[masterStyle.cancelButton, {justifyContent : 'center', width: "40%", height : 60}]}
                                            onPress={() => setVisible(!visible)}
                                        ><Text style={masterStyle.textButton}>Go back</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[masterStyle.affirmButton, {justifyContent: 'center', width: "40%", height : 60}]}
                                            activeOpacity={0.5}
                                            onPress={addNewMember}
                                        >
                                            <Text style={masterStyle.textButton}>Invite to group</Text>
                                        </TouchableOpacity>
                                    </View>
                            </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default EditGroup;

const styles = StyleSheet.create({
    container: {
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    containerTwo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        flexWrap: "wrap",
    },
    memberChip: {
        marginRight: 5,
        padding: 8,
        borderRadius: 8,
        marginVertical: 8,
        elevation: 4,
        backgroundColor: colors.bg
    },
    modalView: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    formInput: {
        padding: 10,
        fontSize: 16,
        height: 60,
        marginVertical: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#555555",
    },
    images: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 4,
        marginLeft: 2,
        marginVertical: 5
    },
    gridview: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center"
    }
})
