import React from 'react';
import { Platform, View } from 'react-native';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { QrCodeModal } from './qr-code-modal/qr-code-modal';
import { Navigator } from './navigator';

export const App = () => {
  return (
    <WalletConnectProvider
      redirectUrl={Platform.OS === 'web' ? window.location.origin : 'yourappscheme://'}
      storageOptions={{
        asyncStorage: AsyncStorage
      }}
      renderQrcodeModal={QrCodeModal}>
      <View style={{ flex: 1 }}>
        <Navigator />
      </View>
    </WalletConnectProvider>
  );
};
