import React, { Component } from 'react';
import { View, Text } from 'react-native';
import QRCamera from './qrCamera';
import axios from 'axios';
import firebase from 'react-native-firebase';

class NewQRAccessory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showQRCamera: true
        };
    }
    qrReceived(data){
        this.setState({showQRCamera: false})
        axios.post('http://localhost:4000/dispositivo/', {
            idDispositivo: data,
            uid: firebase.auth().currentUser.uid
        }).then((res) => {
            this.props.addAccessory(res.data.idDispositivo);
            this.props.close();
        }).catch((e) => {
            console.log(e.response);
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