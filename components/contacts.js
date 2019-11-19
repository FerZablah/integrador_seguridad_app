import React, { Component } from 'react';
import { View, Text, TextInput, TouchableNativeFeedback, Modal, AsyncStorage, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ContactsTable from './contactsTable';
import NewContact from './newContact';
import firebase from 'react-native-firebase';
import axios from 'axios';
import ProfileView from './profileView';
class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNewUser: false,
            name: '',
            contacts: [],
            userToModify: undefined,
            contactsToSearch: [],
            searchTxt: ''
        };
    }
    addUser(user) {
        const newContacts = this.state.contacts;
        newContacts.push(user);
        this.setState({ contacts: newContacts });
    }
    modifyUser(newUser, oldUser) {
        let newContacts = this.state.contacts;
        console.log('old:', oldUser);
        console.log('new:', newUser);
        newContacts = newContacts.filter((obj) => {
            return obj.telefono !== oldUser.telefono;
        });
        newContacts.push(newUser);
        console.log(newContacts);
        this.setState({ contacts: newContacts });
        this.searchContacts(this.state.searchTxt);
    }
    deleteUser(user){
        axios.delete(BASE_URL +'contacto/'+ user.telefono).then((res) => {
            let newContacts = this.state.contacts;    
            newContacts = newContacts.filter((obj) => {
                return obj.telefono !== user.telefono;
            });
            this.setState({ contacts: newContacts });
        }).catch((e) => {
            console.log(e);
        })
    }
    showDeleteAlert(user) {
        console.log('Delete', user);
        Alert.alert(
            '¿Seguro que deseas eliminar a ' + user.nombre + "?",
            'Una vez eliminado un contacto no se podra deshacer la acción.',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: () => this.deleteUser(user),
                    style: 'positive'
                },
            ],
            { cancelable: false },
        );
    }
    componentDidMount() {
        AsyncStorage.getItem('name', (err, val) => {
            this.setState({ name: val });
        });
        axios.get(BASE_URL +'contacto/'+ firebase.auth().currentUser.uid).then((res) => {
            this.setState({ contacts: res.data });
            console.log(res.data);
            this.searchContacts(this.state.searchTxt);
        }).catch((e) => {
            console.log(e);
            Alert.alert(
                'Parece que ya esta registrado este número telefónico',
                [
                    {
                        text: 'Okey',
                        style: 'cancel',
                    },
                ],
                { cancelable: true },
            );
        })
    }
    searchContacts(txt){
        this.setState({searchTxt: txt});
        let newContacts = this.state.contacts;    
        newContacts = newContacts.filter((obj) => {
            return obj.nombre.includes(txt);
        });
        this.setState({contactsToSearch: newContacts})
    }
    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showNewUser}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}
                >
                    <NewContact
                        modifyUser={this.modifyUser.bind(this)}
                        addUser={this.addUser.bind(this)}
                        close={() => this.setState({ showNewUser: false })}
                        userToModify={this.state.userToModify ? this.state.userToModify : null}
                    />
                </Modal>
                <ProfileView name={this.state.name}/>
                <View style={{ flexDirection: 'row', height: '10%' }}>
                    <View style={{ height: '100%', width: '17%', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon onPress={() => this.props.navigation.pop()} name="chevron-left" size={20} color="black" solid />
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
                        onChangeText={(txt) => this.searchContacts(txt)}
                        secureTextEntry={this.props.secureTextEntry}
                    />
                    <View style={styles.buttonView}>
                        <TouchableNativeFeedback>
                            <Icon name="search" size={20} color="black" solid />
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableNativeFeedback onPress={() => this.setState({ showNewUser: true })}>
                            <Icon name="plus" size={20} color="black" solid />
                        </TouchableNativeFeedback>
                    </View>
                </View>
                <ContactsTable
                    setUserToModify={(user) => {
                        this.setState({ userToModify: user, showNewUser: true });
                    }}
                    deleteUser={(user) => {
                        this.showDeleteAlert(user);
                    }}
                    contacts={this.state.contactsToSearch}
                />
            </View>
        );
    }
}
const styles = {
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