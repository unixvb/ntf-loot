import React from 'react';
import { Platform } from 'react-native';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Navigator } from './navigator';
import { QrCodeModal } from './qr-code-modal/qr-code-modal';

export const App = () => {
  return (
    <WalletConnectProvider
      redirectUrl={Platform.OS === 'web' ? window.location.origin : 'yourappscheme://'}
      storageOptions={{
        asyncStorage: AsyncStorage
      }}
      renderQrcodeModal={QrCodeModal}>
      <>
        <Navigator />
      </>
    </WalletConnectProvider>
  );
};
