import React, { Component } from 'react';
import { View, Text, PermissionsAndroid, TouchableNativeFeedback } from 'react-native';
import Contacts from 'react-native-contacts';
import { ScrollView } from 'react-native-gesture-handler';

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          contacts: []
        };
    }
    componentWillMount(){
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              'title': 'Contacts',
              'message': 'This app would like to view your contacts.'
            }
          ).then(() => {
            Contacts.getAll((err, contacts) => {
              if (err === 'denied'){
                // error
              } else {
                // contacts returned in Array
                contacts.sort((a,b) => {
                    if ( a.givenName <  b.givenName ){
                        return -1;
                      }
                      if ( a.givenName >  b.givenName ){
                        return 1;
                      }
                      return 0;
                })
                this.setState({contacts});
              }
            })
          })
    }
    renderContact(contact){
        const finalName = (contact.givenName !== null ? contact.givenName : ''  )+ 
        (contact.middleName !== null ? ' ' + contact.middleName : ''  )+
        ' ' + (contact.familyName !== null ? contact.familyName : '');
        return (
            <TouchableNativeFeedback key={contact.rawContactId} onPress={() => {
                console.log(contact);
                this.props.selectContact({name: finalName , phone: contact.phoneNumbers[0].number.replace(/ /g, "").replace("+521", "")});
                this.props.close();
            }}>
                <View style={{flex: 1, height: 50, borderWidth: 0.2, backgroundColor: 'white', alignItems: 'flex-start', padding: 10, justifyContent: 'center', borderBottomColor: 'grey'}}>
                    <Text>{finalName}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
    render(){
        return(
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                {
                    this.state.contacts.map(contact => this.renderContact(contact))
                }
                </ScrollView>
            </View>
        );
    }
}
export default ContactList;