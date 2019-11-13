import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
class ContactsTableCell extends Component {
    render(){
        return(
            <View style={styles.root}>
                <Text style={styles.text}>{this.props.name}</Text>
                <Text style={styles.text}>{this.props.phone}</Text>
                <Icon name="user-edit" onPress={this.props.modifyClicked} size={20} color="black" solid />
                <Icon name="trash-alt" size={20} color="black" solid />
            </View>
        );
    }
}
const styles = {
    root: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    text: {
        width: '30%',
        textAlign: 'left',
        fontFamily: "Poppins-Regular",
        color: '#191919',
    }
};
export default ContactsTableCell;