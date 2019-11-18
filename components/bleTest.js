import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

class BLETest extends Component {
    constructor() {
        super();
        this.manager = new BleManager();
    }
    componentWillMount() {
        const subscription = this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                this.scanAndConnect();
                subscription.remove();
            }
        }, true);
    }
    scanAndConnect() {
        this.manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log('scanningError', error)
                return;
            }
            if(device.name && device.name.substring(0,12) === 'scrbruid2020'){
                this.props.updateDevices(device.name.substring(13,device.name.length));
            }
        });
    }
    render(){
        return(
            <View>
            </View>
        );
    }
}
export default BLETest;