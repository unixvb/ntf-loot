import React from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { Text, TouchableOpacity, View } from 'react-native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import CloseIcon from '../icons/close.svg';
import { closeIconSize, NavigatorStyles } from './navigator.styles';
import { ArScene } from '../ar-scene';


export const Navigator = () => {
  const connector = useWalletConnect();

  return <>
    <ViroARSceneNavigator initialScene={{ scene: ArScene }} />

    {connector.connected &&
    <TouchableOpacity
      style={NavigatorStyles.closeIcon}
      onPress={() => connector.killSession()}
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
