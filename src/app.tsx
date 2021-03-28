import React from 'react';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import { Platform } from 'react-native';

import { Navigator } from './navigator';
import { QrCodeModal } from './qr-code-modal/qr-code-modal';

export const App = () => {
  return (
    <WalletConnectProvider
      redirectUrl={Platform.OS === 'web' ? window.location.origin : 'yourappscheme://'}
      storageOptions={{
        asyncStorage: undefined
      }}
      renderQrcodeModal={QrCodeModal}>
      <>
        <Navigator />
      </>
    </WalletConnectProvider>
  );
};
