import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Accessories extends Component {
    renderAccessory() {
        return (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Image source={require('../assets/pictures/6.png')} style={styles.image} />
              <Text style={styles.imgDesc}>Anillo:</Text>
              <Text style={styles.imgDesc}>Avento Negro</Text>
            </View>
          </View>
        );
      }
    render(){
        return(
            <View style={{flex: 1, backgroundColor: 'white'}}>
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
                    <View style={{ height: '100%', width: '35%', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon onPress={() => this.props.navigation.pop()}name="chevron-left" size={20} color="black" solid />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 0 }}>
                        <Text style={styles.header}>
                            Accesorios
                        </Text>
                    </View>
                </View>
                <View style={{width: '100%', height: '50%', alignItems: 'center', justifyContent: 'center'}}>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1}}
                    >
                        {this.renderAccessory()}
                        {this.renderAccessory()}
                        {this.renderAccessory()}
                        {this.renderAccessory()}
                    </ScrollView>
                </View>
                <View style={styles.buttonView}> 
                    <TouchableNativeFeedback>
                        <View style={styles.button}>   
                            <Text style={styles.buttonText}>Vincular nuevo accesorio</Text>
                        </View>
                    </TouchableNativeFeedback>
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
        width: '100%',
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
    cardContainer: {
        justifyContent: 'center',
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        borderRadius: 10,
        width: 220,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginTop: 10,
    },
    imgDesc: {
        textAlign: 'center',
        fontSize: 14,
        width: '100%',
        fontFamily: "Poppins-Regular",
        color: '#191919',
        padding: 0,
        margin: 0
    },
    button: {
        borderRadius: 12,
        borderWidth: 1,
        width: '40%',
        height: 50,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 14,
        fontFamily: "Poppins-Bold",
        color: '#191919',
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    buttonView: {
        alignItems: 'center',
        width: '100%',
        marginTop: 20
    },
};
export default Accessories;