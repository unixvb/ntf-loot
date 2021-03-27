// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values"

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"

// Import the ethers library
import { ethers, providers } from "ethers";
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';


var ARScene = require('./src/ar.screen');

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"API_KEY_HERE",
}

var UNSET = "UNSET";
var AR_NAVIGATOR_TYPE = "AR";

var defaultNavigatorType = UNSET;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps: sharedProps,
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    }
  }
  _connectWallet() {
    return window.ethereum
      .enable()
      .then(
        () => Promise.resolve(new ethers.providers.Web3Provider(window.ethereum))
      )
      .then(provider => {
        return provider.getNetwork().then(network => {
          if (network.chainId !== 4)
            throw new Error(`Unsupported network ID: ${chainId}`);
        const signer = provider.getSigner();
        this.setState({
          provider: provider,
          signer: signer,
        });
        }).catch(error => {
          window.alert(JSON.stringify(error));
          return this._connectWallet();
      });
      
    });
  }
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            View your character:
          </Text>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>Connect wallet</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _getARNavigator() {
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: ARScene}} />
    );
  }
  
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this._connectWallet().then(() =>
        this.setState({
          navigatorType: navigatorType,
        })
      );
    }
  }

  _exitViro() {
    this.setState({
      navigatorType : UNSET
    })
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports = App
