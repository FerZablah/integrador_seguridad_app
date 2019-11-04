import React, { Component } from 'react';
import { View, Text, Image, TouchableNativeFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RegisterInput from './registerInput';
class RegisterForm extends Component {
    render(){
        return(
            <View style={styles.root}>
                <Text style={styles.title}>
                    Casi listo, necesitamos unos cuantos datos para comenzar.
                </Text>
                <Image style={styles.image} source={ require('../assets/pictures/5.png')} />
                <KeyboardAwareScrollView>
                    <View style={{justifyContent: 'space-around'}}>
                        <RegisterInput 
                            label={'Nombre'}
                            placeholder={'Ej: Andrea'}
                            
                        />    
                        <RegisterInput 
                            label={'Correo'}
                            placeholder={'Ej: andrea@gmail.com'}
                            keyboardType={'email-address'}
                        />
                        <RegisterInput 
                            label={'Télefono'}
                            placeholder={'Ej: 811 123 4567'}
                            keyboardType={'phone-pad'}
                        />
                        <RegisterInput 
                            label={'Contraseña'}
                            placeholder={''}
                            secureTextEntry
                        />
                        <RegisterInput 
                            label={'Repetir contraseña'}
                            placeholder={''}
                            secureTextEntry
                        />
                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.buttonView}> 
                    <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Home')}>
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