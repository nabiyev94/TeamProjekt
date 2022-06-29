import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Dimensions,
    Pressable,
    Image
} from 'react-native';
import {useGroup} from '../../components/group/group_context';
import {colors} from '../../components/Theme';
import CreateGroup from "./CreateGroup";
import {Icon} from "@rneui/base";
import {masterStyle} from "../../components/style/MasterStyle";
import {masterColors} from "../../components/style/MasterColors";


const {width} = Dimensions.get("window");


const Groups = ({navigation, route}) => {

    const {groups, setgroups} = useGroup();
    console.log(groups, 'groups');
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ListEmptyComponent={
                <SafeAreaView>
                    <View style={styles.emptyComponent}>
                    <Text style={masterStyle.textTitle}>Do you want to start a Travel Group?</Text>
                </View>
                <View style={styles.btnView}>
                    <TouchableOpacity
                        style={masterStyle.affirmButton}
                        onPress={() => navigation.navigate('CreateGroup')}
                    >
                        <Text style={masterStyle.textButton}>Create New Group</Text>
                    </TouchableOpacity>
                </View>
                </SafeAreaView>
                }
                data={groups?.slice().reverse()}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => {
                    return (
                        <View  style={styles.flatListItem}>
                            <Pressable onPress={() => {
                                navigation.navigate('Suggestions', {
                                    data: item
                                })
                            }} style={[styles.flatListPressables, {flex: 1,flexDirection:"row",alignItems: "center"}]}>
                                 <View>
                                     <Image
                                     style={styles.images}
                                     source={item?.image}
                                     key={item.image}
                                     />
                                 </View>
                                <Text style={[masterStyle.textStandard, {marginLeft: 10}]}>{item?.groupName}</Text>
                            </Pressable>
                            <Pressable onPress={() => {

                                navigation.navigate('GroupManager', {
                                    data: item
                                })}}
                                style={styles.flatListPressables}>
                                <Icon type={'material-community'} name={'dots-vertical'}></Icon>

                            </Pressable>
                        </View>
                    )
                }}
            />
            {groups.length > 0 &&
             <TouchableOpacity
                 style={styles.btn}
                 onPress={() => navigation.navigate('CreateGroup')}>
                 <Text style={masterStyle.textButton}>+</Text>
             </TouchableOpacity>
            }
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        position: "relative",
        backgroundColor : masterColors.backgroundLight
    },

    flatListItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        margin: 10,
        elevation: 12,
        backgroundColor: '#ececec',
        marginVertical: 10,
        borderRadius: 10,
    },
    flatListPressables: {
        padding: 10,
    },
    emptyComponent: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50
    },

    btn: {
        width: 65,
        height: 65,
        backgroundColor: masterColors.primaryLight,
        borderRadius: 100,
        position: "absolute",
        bottom: 20,
        right: 15,
        elevation: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    btnText: {
        fontSize: 22,
        color: colors.text_light,
    },

    btnView: {
        paddingTop: 96,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    images: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight:4,
        marginLeft: 2
    }
});

export default Groups;
