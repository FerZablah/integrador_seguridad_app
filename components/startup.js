import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
class Startup extends Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if(!user){
                //Si cerro sesion, regresar a login:
                this.props.navigation.navigate('Login');
            }
        })
        AsyncStorage.getItem('firstStartup', (err, val) => {
            if(val){
                //Si ya habia entrado
                //Checar si ya esta iniciada la sesion
                if(firebase.auth().currentUser){
                    //Si, ir a home
                    this.props.navigation.replace('Home');
                }
                else{
                    //No, ir a login
                    this.props.navigation.navigate('Login');
                }
            }
            else{
                //Si no registrar primera vez e ir a signup
                AsyncStorage.setItem('firstStartup', 'true', () => {
                    //ir a signup
                    this.props.navigation.navigate('RegisterForm');
                });
            }
        })
    }
    render(){
        return(
            <View>
                <Text>
                    TEST
                </Text>
            </View>
        );
    }
}
export default Startup;