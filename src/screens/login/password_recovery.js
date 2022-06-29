import React, {Component} from 'react';
import {Text, View, masterStyleheet, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Input} from "@rneui/base";
import {colors} from "../../components/Theme";
import {masterStyle} from "../../components/style/MasterStyle";

export class PasswordRecovery extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{marginTop: 20}}>
                <Input
                    style={masterStyle.input}
                    onChangeText={text => this.setState({registrationInfo: text})}
                    placeholder={'Username'}
                    placeholderTextColor={Colors.black}
                >
                </Input>

                <Input
                    style={masterStyle.input}
                    onChangeText={text => this.setState({registrationInfo: text})}
                    placeholder={'Email'}
                    placeholderTextColor={Colors.black}
                >
                </Input>
                <View style={{alignItems: "center", marginTop: 20}}>
                    <TouchableOpacity
                        title={"Recover Password"}
                        style={masterStyle.affirmButton}
                        onPress={ () => this.props.navigation.navigate("Login")}
                    >
                        <Text style={masterStyle.textButton}>Send me my password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
