import React, { Component } from 'react';
import { View, Text, TextInput, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ContactsTable from './contactsTable';
class Contacts extends Component {
    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={{ alignItems: 'center', width: '40%', height: '10%', marginLeft: 30 }}>
                    <View style={styles.profileView}>
                        <View style={styles.iconContainer}>
                            <Icon name="user" size={15} color="black" solid />
                        </View>
                        <View>
                            <Text style={styles.nameText}>Andrea</Text>
                            <Text style={styles.locationText}>Monterrey, México</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: '10%' }}>
                    <View style={{ height: '100%', width: '17%', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="chevron-left" size={20} color="black" solid />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 0 }}>
                        <Text style={styles.header}>
                            Contactos de Emergencia
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: '10%', alignItems: 'center', justifyContent: 'space-around' }}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Buscar en tus contactos...'}
                        keyboardType={this.props.keyboardType}
                        secureTextEntry={this.props.secureTextEntry}
                    />
                    <View style={styles.buttonView}>
                        <TouchableNativeFeedback>
                            <Icon name="search" size={20} color="black" solid />
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableNativeFeedback>
                            <Icon name="plus" size={20} color="black" solid />
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <ContactsTable />
            </View>
        );
    }
}
const styles = {
    profileView: {
        height: 100,
        width: 100,
        flexDirection: 'row',
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    nameText: {
        textAlign: 'center',
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        color: '#191919',
        padding: 0,
        margin: 0
    },
    locationText: {
        textAlign: 'center',
        fontSize: 10,
        width: '100%',
        fontFamily: "Poppins-Regular",
        color: '#191919',
        padding: 0,
        margin: 0
    },
    iconContainer: {
        borderWidth: 1,
        height: 30,
        width: 30,
        borderRadius: 50,
        borderColor: '#EDF2F7',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 18,
        fontFamily: "Poppins-Bold",
        color: '#191919',
        width: '60%',
        backgroundColor: 'transparent',
        textAlign: 'center'

    },
    input: {
        width: 250,
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
    },
    buttonView: {
        height: '70%',
        width: 50,
        borderRadius: 10,
        borderColor: '#E4E4E4',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
          
    }
};

export default Contacts;