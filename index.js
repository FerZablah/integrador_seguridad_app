/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import BLETest from './components/bleTest';
import Example from './components/walkthrough';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Example);



//adb shell input text "RR"
//adb shell input keyevent 82