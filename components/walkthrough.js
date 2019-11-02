import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: '1',
        title: 'Envía mensajes de alerta con audio y localización a todos tus contactos.',
        image: require('../assets/pictures/1.png'),
        backgroundColor: '#59b2ab',
    },
    {
        key: '2',
        title: 'Registra los accesorios que más te gusten.',
        image: require('../assets/pictures/2.png'),
        backgroundColor: '#febe29',
    },
    {
        key: '3',
        title: 'Envía tu localización en todo momento.',
        image: require('../assets/pictures/3.png'),
        backgroundColor: '#22bcb5',
    },{
        key: '4',
        title: 'Alerta a las autoridadesdonde quiera que estés.',
        image: require('../assets/pictures/4.png'),
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
                <Image style={styles.image} source={item.image} />
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
            <View style={styles.skipButtonStyle.view}>
                <Text style={styles.skipButtonStyle.text}> Saltar </Text>
            </View>
        )
    }
    _renderNext = () => {
        return(
            <View style={styles.nextButtonStyle.view}>
                <Text style={styles.nextButtonStyle.text}> Siguiente </Text>
            </View>
        )
    }
    render() {
        if (this.state.showRealApp) {
            return <App />;
        } else {
            const {dotStyle, activeDotStyle, buttonTextStyle } = styles;
            return (
                    <View style={{flex: 1, backgroundColor: 'white'}}>
                        <AppIntroSlider
                            showSkipButton 
                            renderItem={this._renderItem} 
                            slides={slides} 
                            activeDotStyle={activeDotStyle}
                            dotStyle={dotStyle}
                            onDone={this._onDone} 
                            renderSkipButton={this._renderSkip}
                            renderNextButton={this._renderNext}
                            renderDoneButton={this._renderNext}
                        />
                    </View>
            )
        }
    }
}
const styles = {
    image: {
        width: '110%',
        height: undefined,
        aspectRatio: 3/2,
        backgroundColor: 'blue',
    },
    title: {
        fontSize: 22,
        fontFamily: "Poppins-Bold",
        color: '#191919',
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
        backgroundColor: '#191919'
    },
    dotStyle: {
        backgroundColor: 'white',
        borderColor: '#707070'
    },
    nextButtonStyle: {
        view: {
            borderColor: '#191919',
            borderWidth: 2,
            borderRadius: 7,
            padding: 10
        },
        text: { 
            color: '#191919',
            fontSize: 14,
            fontFamily: "Poppins-Bold"
        }
    },
    skipButtonStyle: {
        text: {
            color: '#191919',
            fontSize: 14,
            fontFamily: "Poppins-Light"
        },
        view: {
            padding: 10
        }
    }
};
export default Example;

