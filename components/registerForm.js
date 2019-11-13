import React, { Component } from 'react';
import { View, Text, Image, TouchableNativeFeedback, Alert, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RegisterInput from './registerInput';
import emailRegex from 'email-regex';
import firebase from 'react-native-firebase';
import axios from 'axios';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            password: '',
            confirmPassword: '',
            mail: '',
            phone: '',
            name: ''
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
        const { mail, password, confirmPassword, name, phone } = this.state;
        if(name.replace(' ', '').length < 2){
            this.showAlert('Nombre inválido', 'Ingrese un nombre de al menos 2 caracteres');
            return false;
        }
        if(!emailRegex({exact: true}).test(mail)){
            this.showAlert('Correo inválido', 'Ingrese un correo válido');
            return false;
        }
        if(phone.length < 10){
            this.showAlert('Teléfono inválido', 'Ingrese un número de teléfono válido');
            return false;
        }
        if(password.length < 6){
            this.showAlert('Contraseña inválida', 'Ingrese una contraseña de al menos 6 caracteres');
            return false;
        }
        if(password !== confirmPassword){
            this.showAlert('Contraseñas no son iguales', 'Ingrese en los dos campos la misma contraseña');
            return false;
        }
        return true;
    }
    signup(){
        if(this.formIsValid()){
            const { mail, password, name, phone } = this.state;
            firebase.auth().createUserWithEmailAndPassword(mail, password).then((res) => {
                axios.post(`http://localhost:4000/usuario`, {
                    name,
                    mail,
                    uid: res.user.uid,
                    phone
                }).then((res) => {
                    firebase.auth().signInWithEmailAndPassword(mail, password).then(() => {   
                        AsyncStorage.setItem('name', res.data.nombre, () => {
                            //Navigate to home
                            this.props.navigation.navigate('Home');
                        });
                    })
                }).catch((e) => {
                    console.log(e);
                });
            }).catch((e) => {
                showAlert('Usuario ya existe', 'Por favor seleccione otro correo.');
            })
        }
    }
    render(){
        return(
            <View style={styles.root}>
                <Text style={styles.title}>
                    Casi listo, necesitamos unos cuantos datos para comenzar.
                </Text>
                <Image style={styles.image} source={ require('../assets/pictures/5.png')} />
                <KeyboardAwareScrollView>
                    <View style={{justifyContent: 'center', flex: 1}}>
                        <RegisterInput 
                            label={'Nombre'}
                            placeholder={'Ej: Andrea'}
                            value={this.state.name}
                            onChangeText={(txt) => this.setState({name: txt})}
                        />    
                        <RegisterInput 
                            label={'Correo'}
                            placeholder={'Ej: andrea@gmail.com'}
                            keyboardType={'email-address'}
                            value={this.state.mail} 
                            autoCapitalize={'none'}
                            onChangeText={(txt) => this.setState({mail: txt})}
                        />
                        <RegisterInput 
                            label={'Télefono'}
                            placeholder={'Ej: 811 123 4567'}
                            keyboardType={'phone-pad'}
                            value={this.state.phone}
                            onChangeText={(txt) => this.setState({phone: txt})}
                        />
                        <RegisterInput 
                            label={'Contraseña'}
                            placeholder={''}
                            secureTextEntry  
                            autoCapitalize={'none'}
                            value={this.state.password}
                            onChangeText={(txt) => this.setState({password: txt})}
                        />
                        <RegisterInput 
                            label={'Repetir contraseña'}
                            placeholder={''}
                            secureTextEntry  
                            autoCapitalize={'none'}
                            value={this.state.confirmPassword}
                            onChangeText={(txt) => this.setState({confirmPassword: txt})}
                        />
                    </View>
                </KeyboardAwareScrollView>
                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Login')}>
                    <Text>¿Ya estas registrado? Inicia sesión</Text>
                </TouchableNativeFeedback>
                <View style={styles.buttonView}> 
                    <TouchableNativeFeedback onPress={this.signup.bind(this)}>
                        <View style={styles.button}>   
                            <Text style={styles.buttonText}>Continuar</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }
}
const styles = {
    root: {
        padding: 30,
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'flex-start'
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
    buttonText: {
        fontSize: 18,
        fontFamily: "Poppins-Bold",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    buttonView: {
        alignItems: 'flex-end',
        width: '100%',
        marginTop: 20
    },
    title: {
        fontSize: 22,
        fontFamily: "Poppins-Bold",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'left',
        marginBottom: '5%',
    },
    image: {
        width: '50%',
        height: undefined,
        aspectRatio: 3/2
    }
};
export default RegisterForm;