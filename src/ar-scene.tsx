import React, { useEffect, useState } from 'react';
import { Viro3DObject, ViroAmbientLight, ViroARScene, ViroConstants, ViroSpotLight } from 'react-viro';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import { replaceIpfsSuffix } from './util/ipfs.util';
import { LootContract } from './util/contract.util';
import { Loots } from './types/loots.enum';

const baseBody = require('./assets/body-green.glb');

const scaleSize = .005;

const sharedProps = {
  scale: [scaleSize, scaleSize, scaleSize],
  position: [0, -0.5, -1],
  type: "GLB"
};

export const ArScene = () => {
  const connector = useWalletConnect();

  const [isInitialized, setIsInitialized] = useState(false);
  const [uriArray, setUriArray] = useState<string[]>([]);

  const get3dModel = async (tokenId: Loots) => {
    await LootContract.methods.uri(tokenId).call()
      .then((uri: string) => {
        //get 3d model URI from meta JSON from 'animation_url'.
        //download model from URI

        return fetch(replaceIpfsSuffix(uri), {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
      })
      .then((res: Response) => res.json())
      .then(json => setUriArray([replaceIpfsSuffix(json.animation_url)]))
      .catch(() => {
      })
  }

  useEffect(() => void connector.connected && get3dModel(Loots.HAT_RED), [connector.connected])

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
      <Viro3DObject source={baseBody} {...sharedProps} />

      {uriArray.map((uri, index) => <Viro3DObject key={uri + index} source={{ uri }}{...sharedProps} />)}
    </ViroARScene>
  );
}
