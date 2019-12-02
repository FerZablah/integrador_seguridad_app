import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
class ContactsTableCell extends Component {
    render(){
        return(
            <View style={styles.root}>
                <Text style={[styles.text, {width: '39%'}]}>{this.props.name}</Text>
                <Text style={[styles.text, {width: '39%'}]}>{this.props.phone}</Text>
                <Icon name="user-edit" style={{width: '13%'}}onPress={this.props.modifyClicked} size={20} color="black" solid />
                <Icon name="trash-alt" onPress={this.props.deleteClicked} size={20} color="black" solid />
            </View>
        );
    }
}
const styles = {
    root: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        textAlign: 'left',
        fontFamily: "Poppins-Regular",
        color: '#191919',
    }
};
export default ContactsTableCell;