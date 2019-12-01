import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableNativeFeedback, Modal, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NewAccessory from './newAccessory';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import NewQRAccessory from './newQRAccessory';
import axios from 'axios';
import ProfileView from './profileView';
import firebase from 'react-native-firebase';
import BASE_URL from '../base_url.js';
class Accessories extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showNewAccessory: false,
            showNewQRAccessory: false,
            dispositivos: [],
            showSpinner: true
        };
    }
    deleteAccessory(id){
        axios.delete(BASE_URL +'dispositivo/' +id).then((res) => {
            let newDispositivos = this.state.dispositivos;    
            newDispositivos = newDispositivos.filter((obj) => {
                return obj.idDispositivo !== id;
            });
            this.setState({ dispositivos: newDispositivos });
        }).catch((e) => {
            console.log(e);
        })
    }
    showDeleteAlert(dispositivo){
        Alert.alert(
            '¿Seguro que deseas eliminar el accesorio Avento Negro?',
            'Una vez eliminado un accesorio no se podra deshacer la acción.',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: () => this.deleteAccessory(dispositivo.idDispositivo),
                    style: 'positive'
                },
            ],
            { cancelable: false },
        );
    }
    addAccessory(dispositivo){
        const newDispositivos = this.state.dispositivos;
        newDispositivos.push({idDispositivo: dispositivo});
        this.setState({ dispositivos: newDispositivos });
    }
    renderAccessory(dispositivo) {
        return (
            <TouchableNativeFeedback key={dispositivo.idDispositivo} onPress={() => this.showDeleteAlert(dispositivo)}>
                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                    <Image source={require('../assets/pictures/6.png')} style={styles.image} />
                    <Text style={styles.imgDesc}>Anillo:</Text>
                    <Text style={styles.imgDesc}>Avento Negro</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
      }
    getAccessories(){
        this.setState({showSpinner: true});
        axios.get(BASE_URL+'dispositivo/'+firebase.auth().currentUser.uid)
        .then((res) => {
            this.setState({dispositivos: res.data, showSpinner: false});
            console.log(res.data);
        }).catch((e) => {
            console.log(e);
        })
    }
    componentDidMount(){
        console.log('fetching accesory');
        AsyncStorage.getItem('name', (err, val) => {
            this.setState({ name: val });
        });
        this.getAccessories();
    }
    render(){
        let devicesView = <ActivityIndicator size={'large'} style={{flex: 1}} animating={true}/>;
        if(!this.state.showSpinner){
            devicesView = (
                <View style={{width: '100%', height: '50%', alignItems: 'center', justifyContent: 'center'}}>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1}}
                    >
                        {
                            this.state.dispositivos.map(dispositivo => this.renderAccessory(dispositivo))
                        }
                    </ScrollView>
                </View>
            );
        } 

        return(
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showNewAccessory}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}
                >
                    <NewAccessory 
                        close={() => this.setState({showNewAccessory: false})}
                        addAccessory={this.addAccessory.bind(this)}
                    />
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showNewQRAccessory}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}
                >
                    <NewQRAccessory 
                        addAccessory={this.addAccessory.bind(this)}
                        close={() => this.setState({showNewQRAccessory: false})}
                    />
                </Modal>
                <ProfileView name={this.state.name}/>
                <View style={{ flexDirection: 'row', height: '10%' }}>
                    <View style={{ height: '100%', width: '35%', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon onPress={() => this.props.navigation.pop()}name="chevron-left" size={20} color="black" solid />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 0 }}>
                        <Text style={styles.header}>
                            Accesorios
                        </Text>
                    </View>
                </View>
                {devicesView}
                <View style={styles.buttonsViews}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <TouchableNativeFeedback onPress={() => this.setState({showNewQRAccessory: true})}>
                        <View style={styles.button}>
                            <Material name="qrcode-scan" size={35}color="black" solid/>
                            <Text style={styles.buttonText}>Añadir accesorio (QR)</Text>
                        </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <TouchableNativeFeedback onPress={() => this.setState({showNewAccessory: true})}>
                        <View style={styles.button}>
                            <Material name="bluetooth" size={35}color="black" solid/>
                            <Text multiline style={styles.buttonText}>Añadir accesorio (Bluetooth)</Text>
                        </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = {
    cardContainer: {
        justifyContent: 'center',
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        borderRadius: 10,
        width: 220,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginTop: 10,
    },
    imgDesc: {
        textAlign: 'center',
        fontSize: 14,
        width: '100%',
        fontFamily: "Poppins-Regular",
        color: '#191919',
        padding: 0,
        margin: 0
    },
    button: {
        borderRadius: 12,
        borderWidth: 1,
        width: '50%',
        height: '50%',
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 12,
        fontFamily: "Poppins-Bold",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    buttonView: {
        alignItems: 'center',
        width: '100%',
        marginTop: 20
    },
    buttonsViews: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
};
export default Accessories;