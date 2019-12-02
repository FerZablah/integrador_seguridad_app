import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, Alert, AsyncStorage, ActivityIndicator, Image, KeyboardAvoidingView } from 'react-native';
import firebase from 'react-native-firebase';
import emailRegex from 'email-regex';
import RegisterInput from './registerInput';
import BASE_URL from '../base_url.js';

import axios from 'axios';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            password: '',
            mail: '',
            showSpinner: false
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
            this.setState({password: ''});
            return false;
        }
        return true;
    }
    login(){
        this.setState({mail: '', password: ''});
        if(this.formIsValid()){
            this.setState({showSpinner: true});
            firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.password).then((res) => {
                console.log(res);
                axios.get(`${BASE_URL}usuario/${res.user.uid}`).then((user) =>{       
                    AsyncStorage.setItem('name', user.data.nombre, () => {  
                            //ir a home
                            this.setState({mail: '', password: '', showSpinner: false});
                            this.props.navigation.navigate('Home');
                    });
                }).catch((e) => {
                    console.log(e);
                    this.setState({showSpinner: false});
                })
            }).catch((e) => {
                this.showAlert('Usuario y/o contraseña incorrectos', 'Parece que el usuario no existe o la contraseña es inválida');
                this.setState({showSpinner: false});
                this.setState({ password: '' });
            });
        }
        else{
            this.setState({ mail: '', password: '' });
            this.setState({showSpinner: false});
        }
    }
    render(){
        return(
            <View style={styles.root}>

                    <Text style={styles.title}>
                        Inicia Sesión
                    </Text>
                    <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={styles.image} source={ require('../assets/pictures/5.png')} />
                    </View>
                    <KeyboardAvoidingView behavior="padding" style={{alignItems: 'center', flex: 1}} keyboardVerticalOffset={-500} enabled>

                    <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 30}}>
                        <ActivityIndicator size={'large'} style={{opacity: this.state.showSpinner ? 1.0 : 0.0}} animating={true}/> 
                        <RegisterInput 
                                    label={'Correo'}
                                    placeholder={'Ej: andrea@gmail.com'}
                                    keyboardType={'email-address'}
                                    value={this.state.mail} 
                                    autoCapitalize={'none'}
                                    onChangeText={(txt) => this.setState({mail: txt.toLowerCase()})}
                        />
                        <RegisterInput 
                                    label={'Contraseña'}
                                    placeholder={''}
                                    secureTextEntry  
                                    autoCapitalize={'none'}
                                    value={this.state.password}
                                    onChangeText={(txt) => this.setState({password: txt})}
                        />
                        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: 10, justifyContent: 'flex-end'}}>
                            <TouchableNativeFeedback onPress={this.login.bind(this)}>
                                <View style={styles.button}>   
                                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('RegisterForm')}> 
                                <Text style={styles.registerText.root}>
                                    <Text style={styles.registerText.question}>{'¿No tienes cuenta? '}</Text>
                                    <Text style={[styles.registerText.question, {textDecorationLine: 'underline'}]}>{'Regístrate aquí'}</Text>
                                </Text>
                        </TouchableNativeFeedback>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}
const styles = {
    registerText: {
        root: {
            textAlign: 'center',
            marginTop: 25
        },
        question: { 
            fontSize: 12,
            fontFamily: "Poppins-Regular",
            color: '#191919',
            backgroundColor: 'transparent'
        }
    },
    root: {
        paddingHorizontal: '10%',
        justifyContent: 'flex-end',
        flex: 1,
        alignItems: 'center'
    },
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
    },
    buttonText: {
        fontSize: 15,
        fontFamily: "Poppins-Bold",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    button: {
        borderRadius: 12,
        borderWidth: 1,
        width: '40%',
        height: 50,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '80%',
        height: '40%',
        aspectRatio: 3/2
    },
    title: {
        fontSize: 22,
        fontFamily: "Poppins-Bold",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'left',
        marginTop: '15%',
    },
};
export default Login;