import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BLETest from './bleTest';
import firebase from 'react-native-firebase';
import axios from 'axios';
import BASE_URL from '../base_url.js';

class BluetoothList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            devices: []
        };
    }
    addDevice(name){
        axios.post(BASE_URL + 'dispositivo/', {
            idDispositivo: name,
            uid: firebase.auth().currentUser.uid
        }).then((res) => {
            this.props.addAccessory(res.data.idDispositivo);
            this.props.close();
        }).catch((e) => {
            console.log(e);
        })
    }
    renderCell(name){
        return (
            <TouchableNativeFeedback key={name} onPress={() => this.addDevice(name)}>
                <View style={styles.cell}>
                    <Icon name="bluetooth-b" size={20} color="black" solid />
                    <Text style={styles.label}>
                        {name}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
    updateDevices(device){
        if(!this.state.devices.includes(device)){
            let newDevices = this.state.devices;    
            newDevices.push(device);
            this.setState({ devices: newDevices });
        }
    }
    render(){
        return(
            <View style={{flex: 1, justifyContent: 'flex-start', marginTop: 10}}>
                {this.state.devices.map(device => this.renderCell(device))}
                <BLETest updateDevices={this.updateDevices.bind(this)}></BLETest>
            </View>
        );
    }
}
const styles = {
    cell: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    label: {
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'left',
        marginLeft: 15
    }
};
export default BluetoothList;