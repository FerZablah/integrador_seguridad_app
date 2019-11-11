import React, { Component } from 'react';
import { View, Text, TextInput,TouchableNativeFeedback, Alert, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import emailRegex from 'email-regex';
import axios from 'axios';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            password: '',
            mail: ''
        };
    }
    showAlert(title, message){
        Alert.alert(
            title,
            message,
            [
              {text: 'Okey'},
            ],
            {cancelable: false},
          );
    }
    formIsValid(){
        const { mail, password } = this.state;
        if(!emailRegex({exact: true}).test(mail)){
            this.showAlert('Correo inválido', 'Ingrese un correo válido');
            return false;
        }
        if(password.length < 6){
            this.showAlert('Contraseña inválida', 'Ingrese una contraseña de al menos 6 caracteres');
            return false;
        }
        return true;
    }
    login(){
        if(this.formIsValid()){
            firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.password).then((res) => {
                console.log(`http://localhost:4000/usuario/${res.user.uid}`);
                axios.get(`http://localhost:4000/usuario/${res.user.uid}`).then((res) =>{
                    AsyncStorage.setItem('name', res.nombre);
                }).catch((e) => {
                    console.log(e);
                })
            }).catch((e) => {
                this.showAlert('Credenciales inválidas', 'El usuario parece no existir o la contraseña es inválida');
                this.setState({ mail: '', password: '' });
            });
        }
        else{
            this.setState({ mail: '', password: '' });
        }
    }
    render(){
        return(
            <View>
                <Text style={styles.label}>
                    Correo
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={this.props.placeholder}
                    keyboardType={'email-address'}
                    value={this.state.mail}
                    autoCapitalize={'none'}
                    onChangeText={(txt) => this.setState({mail: txt.toLowerCase()})}
                />
                <Text style={styles.label}>
                    Contraseña
                </Text>
                <TextInput
                    style={styles.input}
                    value={this.state.password}
                    placeholder={this.props.placeholder}
                    keyboardType={this.props.keyboardType}
                    secureTextEntry
                    autoCapitalize={'none'}
                    onChangeText={(txt) => this.setState({password: txt})}
                />
                <TouchableNativeFeedback onPress={this.login.bind(this)}>
                    <View>
                        <Text>Login</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback>
                    <View>
                        <Text>Signup</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}
const styles = {
    label: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'left',
        width: '50%'
    },
    input: {
        width: '50%',
        fontSize: 11,
        fontFamily: "Poppins-Regular",
        color: '#191919',
        textAlign: 'left',
        height: 50,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E4E4E4',
        borderRadius: 12,
        backgroundColor: '#F7F7F7'
    }
};
export default Login;