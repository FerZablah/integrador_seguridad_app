import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ContactsTableCell from './contactsTableCell';
class ContactsTable extends Component {
    renderCell(contact){
        return (
            <ContactsTableCell
                modifyClicked={() => this.props.setUserToModify(contact)}
                key={contact.telefono}
                name={contact.nombre}
                phone={contact.telefono}
            />
        );
    }
    render(){
        return(
            <View style={{ flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{width: '40%', marginLeft: '4%', fontFamily: "Poppins-Bold", color: '#191919'}}>Nombre</Text>
                    <Text style={{fontFamily: "Poppins-Bold", color: '#191919'}}>Teléfono</Text>
                </View>
                {
                    this.props.contacts.map(contact => this.renderCell(contact))
                }
            </View>
        );
    }
}
export default ContactsTable;