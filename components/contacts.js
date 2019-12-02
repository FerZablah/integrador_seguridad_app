import React, { Component } from 'react';
import { View, Text, TextInput, TouchableNativeFeedback, Modal, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ContactsTable from './contactsTable';
import NewContact from './newContact';
import firebase from 'react-native-firebase';
import axios from 'axios';
class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNewUser: false,
            name: '',
            contacts: [],
            userToModify: undefined,
            contactsToSearch: [],
            searchTxt: '',
            showSpinner: false
        };
    }
    addUser(user) {
        console.log(user);
        const newContacts = this.state.contacts;
        newContacts.push(user);
        this.setState({ contacts: newContacts });
        this.searchContacts(this.state.searchTxt);
        console.log(this.state);
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
        console.log(user);
        axios.delete(BASE_URL +'contacto/'+ user.telefono).then((res) => {
            let newContacts = this.state.contacts;    
            newContacts = newContacts.filter((obj) => {
                return obj.telefono !== user.telefono;
            });
            this.setState({ contacts: newContacts });
            this.searchContacts(this.state.searchTxt);
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
        this.setState({showSpinner: true});
        axios.get(BASE_URL +'contacto/'+ firebase.auth().currentUser.uid).then((res) => {
            this.setState({ contacts: res.data, showSpinner: false });
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
        let contactsTableView = <ActivityIndicator size={'large'} style={{flex: 1}} animating={true}/>;
        if(!this.state.showSpinner){
            contactsTableView = (  
                <ContactsTable
                    setUserToModify={(user) => {
                        this.setState({ userToModify: user, showNewUser: true });
                    }}
                    deleteUser={(user) => {
                        this.showDeleteAlert(user);
                    }}
                    contacts={this.state.contactsToSearch}
                />
            );
        }
        return (
            <View style={{ flex: 1, paddingHorizontal: 30, paddingTop: 30 }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.showNewUser}
                    onRequestClose={() => {
                        this.setState({ showNewUser: false })
                    }}
                >
                    <NewContact
                        modifyUser={this.modifyUser.bind(this)}
                        addUser={this.addUser.bind(this)}
                        close={() => this.setState({ showNewUser: false })}
                        userToModify={this.state.userToModify ? this.state.userToModify : null}
                    />
                </Modal>
                <View style={{ flexDirection: 'row', height: '10%' }}>
                    <View style={{ height: '100%', width: '22%', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon onPress={() => this.props.navigation.pop()} name="chevron-left" size={20} color="black" solid />
                    </View>
                    <View style={{ alignItems: 'center', width: 200, justifyContent: 'center', marginBottom: 15 }}>
                        <Text style={styles.header}>
                            Contactos de Emergencia
                        </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: '10%', alignItems: 'center', justifyContent: 'space-around' }}>
                     <View style={styles.searchField}>
                        <TextInput
                            style={styles.input}
                            placeholder={'Buscar en tus contactos...'}
                            keyboardType={this.props.keyboardType}
                            onChangeText={(txt) => this.searchContacts(txt)}
                            secureTextEntry={this.props.secureTextEntry}
                        />
                        <Icon name="search" size={20} color="#BABABA" />
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableNativeFeedback onPress={() => this.setState({ showNewUser: true })}>
                            <Icon name="plus" size={20} color="black" solid />
                        </TouchableNativeFeedback>
                    </View>
                </View>
                {contactsTableView}
            </View>
        );
    }
}
const styles = {
    searchField: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#BABABA',
        borderWidth: 1,
        backgroundColor: '#F7F7F7',
        paddingRight: 5,
        marginRight: 9
    },
    input: {
        width: '80%',
        fontSize: 12,
        fontFamily: "Poppins-Regular",
        textAlign: 'left',
        height: 50,
        padding: 10,
        backgroundColor: '#F7F7F7',
        color: '#424242',
        borderWidth: 0
    },
    buttonView: {
        height: '70%',
        width: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 8
    },
    header: {
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        textAlign: 'center',
        color: '#424242'
    }
};

export default Contacts;