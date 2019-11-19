import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
class ProfileView extends Component {
    render(){
        return(
            <View>
                <View style={{ alignItems: 'center', width: '40%', height: '10%', marginLeft: 30 }}>
                    <View style={styles.profileView}>
                        <View style={styles.iconContainer}>
                            <Icon name="user" size={15} color="black" solid />
                        </View>
                        <View>
                            <Text style={styles.nameText}>{this.props.name}</Text>
                            <Text style={styles.locationText}>Monterrey, México</Text>
                        </View>
                    </View>
                </View>
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
    }
};
export default ProfileView;