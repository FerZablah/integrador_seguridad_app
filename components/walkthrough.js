import React from 'react';
import { View, Text, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: '1',
        title: 'Envía mensajes de alerta con audio y localización a todos tus contactos.',
        text: 'Description.\nSay something cool',
        image: require('../assets/photo.jpg'),
        backgroundColor: '#59b2ab',
    },
    {
        key: 'somethun-dos',
        title: 'Title 2',
        text: 'Other cool stuff',
        image: require('../assets/photo.jpg'),
        backgroundColor: '#febe29',
    },
    {
        key: 'somethun1',
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('../assets/photo.jpg'),
        backgroundColor: '#22bcb5',
    }
];

class Example extends React.Component {
    constructor() {
        super();
        this.state = {
            showRealApp: false
        }
    }
    _renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
                <Image source={item.image} />
            </View>
        );
    }
    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
    }
    _renderSkip = () => {
        return(
            <View style={{ padding: 10}}>
                <Text style={{color: 'black'}}> Saltar </Text>
            </View>
        )
    }
    _renderNext = () => {
        /*return(
            <TouchableNativeFeedback style={{marginBottom: 400}}>
                <View style={{borderColor: 'black', borderWidth: 2}}>
                    <Text style={{ margin: 30 }}>{'Button'}</Text>
                </View>
            </TouchableNativeFeedback>
        )*/
        return(
            <View style={{borderColor: 'black', borderWidth: 2, borderRadius: 7, padding: 10}}>
                <Text style={{color: 'black'}}> Siguiente </Text>
            </View>
        )
    }
    render() {
        if (this.state.showRealApp) {
            return <App />;
        } else {
            const {dotStyle, activeDotStyle, buttonTextStyle } = styles;
            return <AppIntroSlider
                        showSkipButton 
                        renderItem={this._renderItem} 
                        slides={slides} 
                        activeDotStyle={activeDotStyle}
                        dotStyle={dotStyle}
                        onDone={this._onDone} 
                        renderSkipButton={this._renderSkip}
                        renderNextButton={this._renderNext}
                    />;
        }
    }
}
const styles = {
    image: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
    },
    title: {
        fontSize: 22,
        color: 'black',
        backgroundColor: 'transparent',
        textAlign: 'left',
        marginBottom: '50%',
    },
    slide: {
        flex: 1,
        padding: '10%',
        alignItems: 'center',
    },
    activeDotStyle: {
        backgroundColor: 'black'
    },
    dotStyle: {
        backgroundColor: 'white',
        borderColor: '#707070'
    },
    nextButtonStyle: {
        view: {
            borderColor: 'black'
        },
        textColor: 'black',
    }
};
export default Example;

