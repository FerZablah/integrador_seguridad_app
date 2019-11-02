/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import BLETest from './components/bleTest';
import Example from './components/walkthrough';
import RegisterForm from './components/registerForm';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RegisterForm);



//adb shell input text "RR"
//adb shell input keyevent 82