import React, {useState, useEffect} from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    SafeAreaView,
    View,
    Alert,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import {TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {colors} from "../../components/Theme";
import {useGroup} from "../../components/group/group_context";
import {masterStyle} from "../../components/style/MasterStyle";

const {width} = Dimensions.get("window");

const CreateGroup = ({navigation}) => {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [save, setSave] = useState(false);
    const [photoIndex, setphotoIndex] = useState(0);
    const [savephotoindex, setsavephotoindex] = useState(false);

    const [photo, setphoto] = useState('');

    const images = [
        require('../../../assets/avatars/ball.jpg'),
        require('../../../assets/avatars/balloon.jpg'),
        require('../../../assets/avatars/dolphins.jpg'),
        require('../../../assets/avatars/drink.jpg'),
        require('../../../assets/avatars/flamingo.jpg'),
        require('../../../assets/avatars/palm.jpg'),
        require('../../../assets/avatars/sandals.jpg'),
        require('../../../assets/avatars/ship.jpg'),
        require('../../../assets/avatars/suitcase.jpg'),
    ]

    useEffect(() => {
        AsyncStorage.getItem('image_token').then((res) => {
            if (res !== null) {
                setphotoIndex(JSON.parse(res));
            } else {
                setphotoIndex(0);
            }
        })
    }, [])


    useEffect(() => {
        if (savephotoindex) {
            AsyncStorage.setItem('image_token', JSON.stringify(photoIndex)).then((res) => {
                console.log(photo, 'farigh', 'runned')
            }).catch((error) => {
                console.log(error);
                Alert.alert("Error", error.message);
            })
        }
    }, [savephotoindex])


    useEffect(() => {
        if (save) {
            AsyncStorage.setItem('groups', JSON.stringify(groups)).then((res) => {
                console.log(groups, 'farigh')
                setLoading(false);
                navigation.navigate("Groups");
            }).catch((error) => {
                setLoading(false);
                console.log(error);
                Alert.alert("Error", error.message);
            })
        }
    }, [save])

    console.log(photoIndex, 'photoIndex')

    const {groups, setgroups} = useGroup();

    const saveGroup = async () => {
        if (value.length === 0) {
            return Alert.alert("Restricted", "Please enter a group name");
        }
        setgroups((groups) => [...groups, {
            groupName: value,
            groupMembers: [],
            date: JSON.stringify(new Date()),
            id: Math.trunc(Math.random() * 100000),
            traveldates: [],
            image: images[photoIndex]
        }]);
        if (photoIndex === images.length - 1) {
            setphotoIndex(0);
        } else {
            setphotoIndex((prevstate) => prevstate + 1);
        }
        setsavephotoindex(true)
        setLoading(true);
        setSave(true);
    };

    return (
        <SafeAreaView
            style={styles.container}
        >
            <Text style={[masterStyle.textTitle, styles.title]}>Enter a name for your group</Text>
            <TextInput
                placeholder="Enter Group Name"
                placeholderTextColor={"#d3d3d3"}
                style={[styles.formInput, {alignSelf : 'center', flexDirection: "row", backgroundColor : 'white', width : 350}]}
                value={value}
                onChangeText={(value) => setValue(value)}
            />
            <TouchableOpacity
                style={[masterStyle.affirmButton, styles.button]}
                activeOpacity={0.5}
                onPress={saveGroup}
            >
                {loading ? (
                    <ActivityIndicator size={"large"} color={"#ffff"}/>
                ) : (
                    <Text style={masterStyle.textButton}>Save</Text>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default CreateGroup;

const styles = StyleSheet.create({
    container: {
        padding: 5,
        marginTop : 20,
      flex: 1,
    },
    formInput: {
        padding: 10,
        marginBottom : 25,
        fontSize: 16,
        marginVertical: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#555555",
    },
    title: {
        textAlign: "center"
    },
    button: {
      alignSelf: "center"
    }
});
