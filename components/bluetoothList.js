import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
class BluetoothList extends Component {
    renderCell(name){
        return (
            <View style={styles.cell} key={name}>
                <Icon name="bluetooth-b" size={20} color="black" solid />
                <Text style={styles.label}>
                    {name}
                </Text>
            </View>
        )
    }
    render(){
        const devices = ['Collar Nova Plata', 'Cinto Hayes Café', '45:F3:D2:00', 'Collar Mango Negro', 'TV Samsung', 'Anillo Tandem Oro']
        return(
            <View style={{flex: 1, justifyContent: 'flex-start', marginTop: 10}}>
                {devices.map(device => this.renderCell(device))}
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