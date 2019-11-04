/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import BLETest from './components/bleTest';
import Example from './components/walkthrough';
import RegisterForm from './components/registerForm';
import Home from './components/home';
import Contacts from './components/contacts';
import {name as appName} from './app.json';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator({
    Intro: {
        screen: Example,
    },
    RegisterForm: {
        screen: RegisterForm
    },
    Home: {
        screen: Home
    },
    Contacts: {
        screen: Contacts
    }
  }, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  });

AppRegistry.registerComponent(appName, () => createAppContainer(AppNavigator));



//adb shell input text "RR"
//adb shell input keyevent 82