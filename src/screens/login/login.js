import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Pressable, Image} from 'react-native';
import {Input} from "@rneui/base";
import {Link} from '@react-navigation/native';
import {masterColors} from "../../components/style/MasterColors";
import {masterStyle} from "../../components/style/MasterStyle";

export class Login extends Component {
    state = {
        login: "",
        password: "",
        isLoading: true,
        emptyLogin: false,
        emptyPassword: false,
    };

    checkCredentials = () => {
        if (this.state.login.length !== 0 && this.state.password.length !== 0) {
            this.props.navigation.navigate("SetupWelcome");
            this.setState({emptyLogin: false, emptyPassword: false});

        } else {
            if (this.state.login.length=== 0) {
                this.setState({emptyLogin: true});
            }
            if (this.state.password === 0) {
                this.setState({emptyPassword: true});
            }
        }
    }

    resetWarning = () => {
        this.setState({emptyLogin: false, emptyPassword: false});
    }

    showError = () => {
        if (this.state.emptyLogin || this.state.emptyPassword) {
            return <View style={{alignItems : "center"}}><Text style={masterStyle.textError}>Please provide missing credentials!</Text></View>
        }

    }

    render() {

        return (
            <Pressable style={{flex : 1, marginTop : -60}} android_disableSound={true}  onPress={() => this.resetWarning()}>
                {/*<Text style={[masterStyle.headerDark,{color: 'white'}]}>Travel Aid</Text>*/}
                    <View style={{flex: 1, marginHorizontal: 15}}>
                        <Image source={require('../../../assets/travelaidlogo4.png')}
                               style={{
                                   resizeMode : 'contain',width: '100%',
                                   height: undefined,
                                   aspectRatio: 1
                        }}
                               placeholderStyle={{ backgroundColor: 'transparent' }}

                        />
                    </View>
                    <View style={{flex : 1}}>
                        <Input
                            style={masterStyle.input}
                            onChangeText={text => {
                                this.setState({login: text})
                            }}
                            placeholder={'Username'}
                            placeholderTextColor={masterColors.textStandard}
                        >
                        </Input>
                        <Input
                            style={masterStyle.input}
                            onChangeText={text => this.setState({password: text})}
                            placeholder={'Password'}
                            placeholderTextColor={masterColors.textStandard}
                        >
                        </Input>
                        {this.showError()}
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity
                                title={"Email"}
                                style = {masterStyle.affirmButton}
                                onPress={ () => this.checkCredentials()}
                            >
                                <Text style={masterStyle.textButton}>Login</Text>
                        </TouchableOpacity>
                </View>
                        <Link
                            to={{ screen: 'Registration'}}
                            style={masterStyle.link}
                        >
                            I want to register an account
                        </Link>
                        <Link to={{ screen: 'PasswordRecovery'}}
                              style={masterStyle.link}
                        >
                            I forgot my password
                        </Link>
                    </View>
            </Pressable>

        );
    }
}
