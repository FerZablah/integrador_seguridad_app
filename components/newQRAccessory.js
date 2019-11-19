import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import QRCamera from './qrCamera';
import axios from 'axios';
import firebase from 'react-native-firebase';
import BASE_URL from '../base_url.js';

class NewQRAccessory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showQRCamera: true
        };
    }
    qrReceived(data){
        this.setState({showQRCamera: false})
        axios.post(BASE_URL+'dispositivo/', {
            idDispositivo: data,
            uid: firebase.auth().currentUser.uid
        }).then((res) => {
            this.props.addAccessory(res.data.idDispositivo);
            this.props.close();
        }).catch((e) => {
            console.log(e.response);
            this.props.close();
        })
    }
    render(){
        if(this.state.showQRCamera){
            return <QRCamera qrReceived={this.qrReceived.bind(this)}/>;
        }
        return(
            <View>
                <Text>
                    Cargando...
                </Text>
            </View>
        );
    }
}
export default NewQRAccessory;