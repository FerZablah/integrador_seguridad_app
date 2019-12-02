import React, { Component } from "react";
import { View, Text, TouchableNativeFeedback, AsyncStorage } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import mapStyle from '../assets/mapStyle.json'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import firebase from 'react-native-firebase';
import { secret, client } from './foursquare';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogout: false,
      name: '',
      locationText: ''
    };
  }
  componentDidMount(){
    
    AsyncStorage.getItem('name', (err, val) => {
        this.setState({ name: val });
    })
  }
  componentWillMount() {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        axios({
          url: `https://api.foursquare.com/v2/venues/search?ll=${position.coords.latitude},${position.coords.longitude}&client_id=${client}&client_secret=${secret}&v=20190905`,
          method: 'get'
        }).then((res) => {
          let found = false;
          res.data.response.venues.forEach(venue => {
            if(venue.location.city && venue.location.country && !found){
              const city = venue.location.city;
              const country = venue.location.country;
              const locationText = (city ? city + ', ' : '') + (country ? country : '');
              this.setState({locationText});
              found = true;
            }
          })
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }
  signOut(){
    this.setState({showLogout: false});
    firebase.auth().signOut().then(() => {
      AsyncStorage.removeItem('name');
    });
  }
  render() {
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
        <Modal onBackdropPress={() => this.setState({ showLogout: false })} onBackButtonPress={() => this.setState({ showLogout: false })} isVisible={this.state.showLogout}>
          <View style={{ justifyContent: 'flex-end', flex: 1 }}>
            <View style={{ backgroundColor: 'white', width: '100%', height: 100, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableNativeFeedback onPress={() => this.signOut()}>
                <View style={styles.popbutton}>
                  <Text style={styles.popbuttonText}>Cerrar sesión</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </Modal>
        <TouchableNativeFeedback onPress={() => this.setState({ showLogout: true })}>
          <View style={styles.profileView}>
              <Text style={styles.nameText}>{this.state.name}</Text>
              <Text style={styles.locationText}>{this.state.locationText}</Text>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.buttonsViews}>
          <View>
            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Contacts')}>
              <View style={styles.button}>
                <Material name="phone-plus" size={40} color="black" solid />
                <Text style={styles.buttonText}>Contactos de emergencia</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View>
            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Accessories')}>
              <View style={styles.button}>
                <Material name="ring" size={40} color="black" solid />
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
    flex: 1,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 30,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    elevation: 15,
    borderRadius: 20,
    padding: 20
  },
  nameText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: '#191919'
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
  popbuttonText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: 'red',
    backgroundColor: 'transparent',
    textAlign: 'center',
    width: '100%'
  },
  buttonsViews: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  button: {
    borderRadius: 20,
    backgroundColor: 'white',
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  popButton: {
    borderRadius: 15,
    borderWidth: 1,
    height: '60%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Home;
