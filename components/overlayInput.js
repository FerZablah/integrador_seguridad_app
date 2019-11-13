import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
class OverlayInput extends Component {
    render(){
        return(
            <View style={styles.root}>
                <Text style={styles.label}>
                    {this.props.label}
                </Text>
                <TextInput
                    style={styles.input}
                    value={this.props.value}
                    onChangeText={(txt) => this.props.changeTxt(txt)}
                    placeholder={this.props.placeholder}
                    keyboardType={this.props.keyboardType}
                    secureTextEntry={this.props.secureTextEntry}
                />
            </View>
        );
    }
}
const styles = {
    root: {
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
    },
    label: {
        fontSize: 15,
        fontFamily: "Poppins-Regular",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'left'
    },
    input: {
        width: 180,
        fontSize: 13,
        fontFamily: "Poppins-Regular",
        color: '#191919',
        textAlign: 'left',
        height: 50,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E4E4E4',
        borderRadius: 12,
        backgroundColor: '#F7F7F7'
    }
};
export default OverlayInput;
