import React from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import { ArScene } from './ar-scene';
import CloseIcon from './icons/close.svg';
import { step } from './config';

const iconSize = 4 * step;

export const Navigator = () => {
  const connector = useWalletConnect();

  return <>
    <ViroARSceneNavigator initialScene={{ scene: ArScene }} />

    {connector.connected &&
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: 7 * step,
        right: 2 * step,
        width: iconSize,
        height: iconSize,
      }}
      onPress={() => connector.killSession()}
    >
      <CloseIcon width={iconSize} height={iconSize} />
    </TouchableOpacity>
    }

    {!connector.connected &&
    <View style={{
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#008CBA',
          borderRadius: 0.5 * step,
          paddingVertical: 2 * step,
          paddingHorizontal: 4 * step
        }}
        onPress={() => connector.connect()}
      >
        <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>Connect the Wallet</Text>
      </TouchableOpacity>
    </View>
    }
  </>;
}
