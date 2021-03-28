import './shim.js';

import { AppRegistry } from 'react-native';
import { App } from './src/app';

AppRegistry.registerComponent('NFTLoot', () => App);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent('ViroSample', () => App);
