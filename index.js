/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import Walkthrough from './components/walkthrough';
import RegisterForm from './components/registerForm';
import Home from './components/home';
import Contacts from './components/contacts';
import {name as appName} from './app.json';
import Login from './components/login';
import Accessories from './components/accessories';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Startup from './components/startup';
import ContactList from './components/contactList';
const AppNavigator = createStackNavigator({
    Startup: {
        screen: Startup,
    },
    Intro: {
        screen: Walkthrough,
    },
    Login: {
        screen: Login,
    },
    RegisterForm: {
        screen: RegisterForm
    },
    Home: {
        screen: Home
    },
    Contacts: {
        screen: Contacts
    },
    Accessories: {
        screen: Accessories
    }
  }, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  });

AppRegistry.registerComponent(appName, () => createAppContainer(AppNavigator));
//AppRegistry.registerComponent(appName, () => ContactList);


//adb shell input text "RR"
//adb shell input keyevent 82
//adb reverse tcp:4000 tcp:4000
