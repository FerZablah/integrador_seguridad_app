import React, { Component } from 'react';
import { View, Text } from 'react-native';
class ProfileView extends Component {
    render(){
        return(
            <View style={{ backgroundColor: 'red',alignItems: 'center', width: '40%', height: '10%', alignSelf: 'flex-start'}}>
                <View style={styles.profileView}>
                    <View>
                        <Text style={styles.nameText}>{this.props.name}</Text>
                        <Text style={styles.locationText}>Monterrey, México</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = {
    profileView: {
        height: 100,
        flex: 1,
        flexDirection: 'row',
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    nameText: {
        textAlign: 'left',
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
    }
};
export default ProfileView;