import React, { useState, useCallback, useEffect } from 'react'
import {Bubble, Day, GiftedChat, Send} from 'react-native-gifted-chat'
import {masterColors} from "../../components/style/MasterColors";
import {masterStyle} from "../../components/style/MasterStyle";
import {Touchable} from "react-native-web";
import {Keyboard, Pressable, TouchableOpacity} from "react-native";
import dismissKeyboard from "react-native-web/dist/modules/dismissKeyboard";

export function ChatScreen() {
    const [messages, setMessages] = useState([]);
    const jake = {_id: 2, name: 'Jake', avatar: require('../../../assets/chat_screen_avatars/jake.png')};
    const audrey = {_id: 3, name: 'Audrey', avatar: require('../../../assets/chat_screen_avatars/audrey.png')}
    const emily = {_id: 4, name: 'Emily', avatar: require('../../../assets/chat_screen_avatars/emily.png')}
    const herbert = {_id: 5, name: 'Herbert', avatar: require('../../../assets/chat_screen_avatars/herbert.png')}

    const renderDay = (props) => {
        return (<Day {...props} textStyle={masterStyle.textChatDay}/>)
    }


    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: masterStyle.textChat,
                    left : masterStyle.textChat
                }}

                wrapperStyle={{
                    right: {
                        backgroundColor: masterColors.chatRight,
                        padding : 2
                    },
                    left: {
                        backgroundColor: masterColors.chatLeft,
                        padding : 2
                    },
                }}
            />
        );
    }

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello Audrey!',
                createdAt: new Date(),
                user: jake,
            },
            {
                _id: 2,
                text: 'Hello fellow Travel AID users!',
                createdAt: new Date(),
                user: audrey,
            },
            {
                _id: 3,
                text: "Who's ready to make some plans?",
                createdAt: new Date(),
                user: emily,
            },
            {
                _id: 4,
                text: "Well well well...",
                createdAt: new Date(),
                user: herbert,
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <Pressable onPress={() => Keyboard.dismiss()} style={{flex: 1}}>
            <GiftedChat
                messagesContainerStyle={{backgroundColor : masterColors.backgroundLight,}}
                timeTextStyle={{ left: masterStyle.timeText, right: masterStyle.timeText}}
                renderBubble={renderBubble}
                messages={messages}
                onSend={messages => onSend(messages)}
                press
                user={{
                    _id: 1,
                }}
                renderDay={renderDay}
            />
        </Pressable>
    )
}
