import React, { Component } from 'react';
import { Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { View } from 'react-native-animatable';

class QRCamera extends Component {
    onSuccess = ({barcodes}) => {
        console.log(barcodes);
        if(barcodes.length>0){
            if(barcodes[0].type === 'QR_CODE'){
                
                this.props.qrReceived(barcodes[0].data);
            }
        }
    }
    render() {
        return (
            <View style={{flex: 1}}>  
                <Text>Coloque el código QR frente a su camara trasera</Text>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    captureAudio={false}
                    style={{ flex: 1, width: '100%'}}
                    onGoogleVisionBarcodesDetected={this.onSuccess.bind(this)}
                />
            </View>
        );
    }
}
export default QRCamera;