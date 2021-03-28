import React, { useEffect, useState } from 'react';

import {
  ViroARScene,
  ViroConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight
} from 'react-viro';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

const uriArrayMock = ['https://gateway.pinata.cloud/ipfs/QmXvxGf3WZvPJfXUAE4SNvwrPzAmwS2W6dP1EdGHBGV9ge/body.glb'];

const scaleSize = .005;

const sharedProps = {
  scale: [scaleSize, scaleSize, scaleSize],
  position: [0, -0.5, -1],
  type: "GLB"
};

export const ArScene = () => {
  const connector = useWalletConnect();

  const [isInitialized, setIsInitialized] = useState(false);
  const [uriArray] = useState(uriArrayMock);

  const handleTrackingUpdated = (state: ViroConstants) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      setIsInitialized(true);
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  };

  return (
    <ViroARScene onTrackingUpdated={handleTrackingUpdated}>
      <ViroAmbientLight color={"#aaaaaa"} />
      <ViroSpotLight innerAngle={5}
                     outerAngle={90}
                     direction={[0, -1, -.2]}
                     position={[0, 3, 1]}
                     color="#ffffff"
                     intensity={100}
                     castsShadow={true} />

      {uriArray.map((uri, index) =>
        <Viro3DObject
          key={uri + index}
          source={{ uri }}
          {...sharedProps}
        />
      )}
    </ViroARScene>
  );
}
