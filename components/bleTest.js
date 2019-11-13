import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
//import { Buffer } from 'buffer'

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
            if(device.id === 'B8:27:EB:6C:1A:50'){
                console.log(device.id);
                this.manager.stopDeviceScan();
                device.connect().then((device) => {
                    console.log('connected to: ' + device.id);
                    device.discoverAllServicesAndCharacteristics().then((res) => {
                        device.services().then((services) => {
                            console.log(services);
                        })
                    })

                })
                .catch((error) => {
                    // Handle errors
                    console.log('error cant connect to '+ device.name, error);
                });
            }
        });
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
export default BLETest;