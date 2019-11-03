import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ContactsTableCell from './contactsTableCell';
class ContactsTable extends Component {
    render(){
        return(
            <View style={{ flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{width: '40%', marginLeft: '4%', fontFamily: "Poppins-Bold", color: '#191919'}}>Nombre</Text>
                    <Text style={{fontFamily: "Poppins-Bold", color: '#191919'}}>Teléfono</Text>
                </View>
                <ContactsTableCell 
                    name={'Mamá'}
                    phone={'818 123 4567'}
                />
                <ContactsTableCell 
                    name={'Zablah'}
                    phone={'811 543 3232'}
                />
                <ContactsTableCell 
                    name={'Mauricio'}
                    phone={'818 548 4567'}
                />
                <ContactsTableCell 
                    name={'Juan Ma'}
                    phone={'818 253 4567'}
                />
            </View>
        );
    }
}
export default ContactsTable;