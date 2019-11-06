import React, { Component } from "react";
import { View, Text, TouchableNativeFeedback } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import mapStyle from '../assets/mapStyle.json'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }
  render() {
    console.log(this.state);
    return (
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          style={styles.map}
          showsUserLocation={true}
          region={{
            latitude: this.state.latitude || 30.6605774,
            longitude: this.state.longitude || -100.4408559,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        ></MapView>
        <View style={styles.profileView}>
          <View style={styles.iconContainer}>
            <Icon name="user" size={15}color="black" solid/>
          </View>  
          <Text style={styles.nameText}>Andrea</Text>
          <Text style={styles.locationText}>Monterrey, México</Text>
        </View>
        <View style={styles.buttonsViews}>
          <View>
            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Contacts')}>
              <View style={styles.button}>
                <Material name="phone-plus" size={40}color="black" solid/>
                <Text style={styles.buttonText}>Contactos de emergencia</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View>
            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Accessories')}>
              <View style={styles.button}>
                <Material name="ring" size={40}color="black" solid/>
                <Text multiline style={styles.buttonText}>Accesorios</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

      </View>
    );
  }
}
const styles = {
  map: {
    height: '75%',
    zIndex: -1
  },
  profileView: {
    position: 'absolute',
    height: 100,
    width: 100,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignSelf: 'center',
    marginTop: 30,
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
  buttonText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: '#191919',
    backgroundColor: 'transparent',
    textAlign: 'center',
    width: 100
  },
  buttonsViews: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    borderRadius: 15,
    borderWidth: 1,
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Home;
