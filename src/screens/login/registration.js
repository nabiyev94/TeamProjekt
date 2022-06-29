import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Input} from "@rneui/base";
import {masterStyle} from "../../components/style/MasterStyle";

export class Registration extends Component {
    constructor(props) {
        super(props);
        //this.navigation = this.props.navigation;
        this.state = {
            firstName : "",
            lastName : "",
            password : "",
            email : "",
            isLoading: true,
            missingEntry: false,
        };
    }

    checkCredentials = () => {
        if (this.state.firstName.length !== 0 && this.state.lastName.length !== 0 &&
            this.state.password.length !== 0 && this.state.email.length !== 0) {
            this.props.navigation.navigate("SetupWelcome");
        } else {
            this.setState({missingEntry: true});
        }
    }

    showError = () => {
        if (this.state.missingEntry) {
            return <View><Text style={styles.errorText}>Please provide missing credentials!</Text></View>
        }

    }

    render() {
        return (
            <View>
                <Input
                    style={masterStyle.input}
                    onChangeText={text => this.setState({registrationInfo : {firstName: text}})}
                    placeholder={'Firstname'}
                    placeholderTextColor={Colors.black}
                >
                </Input>
                <Input
                    style={masterStyle.input}
                    onChangeText={text => this.setState({registrationInfo : {lastName: text}})}
                    placeholder={'Lastname'}
                    placeholderTextColor={Colors.black}
                >
                </Input>
                <Input
                    style={masterStyle.input}
                    onChangeText={text => this.setState({registrationInfo : {email: text}})}
                    placeholder={'Email'}
                    placeholderTextColor={Colors.black}
                >
                </Input>
                <Input
                    style={masterStyle.input}
                    onChangeText={text => this.setState({registrationInfo : {password: text}})}
                    placeholder={'Password'}
                    placeholderTextColor={Colors.black}
                    secureTextEntry={true}
                >
                </Input>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                        title={"Register"}
                        style={masterStyle.affirmButton}
                        onPress={ () => this.props.navigation.navigate("SetupWelcome")}
                    >
                        <Text style={masterStyle.textButton}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
