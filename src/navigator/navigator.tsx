import React from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import CloseIcon from '../assets/close.svg';
import { closeIconSize, NavigatorStyles } from './navigator.styles';
import { ArScene } from '../ar-scene';


export const Navigator = () => {
  const connector = useWalletConnect();

  const handleCloseButtonPress = () => Alert.alert(
    "Do you really want disconnect your wallet?",
    "We will remove all data about you",
    [
      {
        text: "Yes",
        onPress: () => connector.killSession(),
        style: "cancel"
      },
      {
        text: "No",
        onPress: () => void 0
      }
    ]
  );

  return <>
    <ViroARSceneNavigator initialScene={{ scene: ArScene }} />

    {connector.connected &&
    <TouchableOpacity
      style={NavigatorStyles.closeIcon}
      onPress={handleCloseButtonPress}
    >
      <CloseIcon width={closeIconSize} height={closeIconSize} />
    </TouchableOpacity>
    }

    {!connector.connected &&
    <View style={NavigatorStyles.connectContainer}>
      <TouchableOpacity
        style={NavigatorStyles.connectButton}
        onPress={() => connector.connect()}
      >
        <Text style={NavigatorStyles.connectButtonText}>Connect the Wallet</Text>
      </TouchableOpacity>
    </View>
    }
  </>;
}
