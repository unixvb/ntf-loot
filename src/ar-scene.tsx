import React, { useContext, useEffect, useState } from 'react';
import { Viro3DObject, ViroAmbientLight, ViroARScene, ViroConstants, ViroSpotLight } from 'react-viro';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import { replaceIpfsSuffix } from './util/ipfs.util';
import { LootContract } from './util/contract.util';
import { Loots } from './types/loots.enum';
import { ActiveModelState } from './navigator/state-provider';

const baseBody = require('./assets/body-green.glb');

const scaleSize = .005;

const sharedProps = {
  scale: [scaleSize, scaleSize, scaleSize],
  position: [0, -0.5, -1],
  type: "GLB"
};

export const ArScene = () => {
  const connector = useWalletConnect();

  const { hatIndex, mouthIndex } = useContext(ActiveModelState);

  const [isInitialized, setIsInitialized] = useState(false);
  const [uriArray, setUriArray] = useState<string[]>([]);
  const [uriMouthArray, setMouthUriArray] = useState<string[]>([]);
  const [pinkBody, setPinkBody] = useState<string>();

  const get3dModel = async (tokenId: Loots, callback: (animationUrl: string) => void) => {
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
      .then(json => callback(replaceIpfsSuffix(json.animation_url)))
      .catch(() => {
      })
  }

  useEffect(() => {
    get3dModel(Loots.HAT_RED, (animationUrl => setUriArray(arr => [...arr, animationUrl])));
    get3dModel(Loots.HAT_WHITE, (animationUrl => setUriArray(arr => [...arr, animationUrl])));
    get3dModel(Loots.HAT_BLACK, (animationUrl => setUriArray(arr => [...arr, animationUrl])));
    get3dModel(Loots.HAT_BLUE, (animationUrl => setUriArray(arr => [...arr, animationUrl])));
    get3dModel(Loots.HAT_GREEN, (animationUrl => setUriArray(arr => [...arr, animationUrl])));

    get3dModel(Loots.MOUTH_SAD, (animationUrl => setMouthUriArray(arr => [...arr, animationUrl])));
    get3dModel(Loots.MOUTH_SMILE, (animationUrl => setMouthUriArray(arr => [...arr, animationUrl])));

    get3dModel(Loots.BODY_PINK, (animationUrl => setPinkBody(animationUrl)));
  }, []);

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
      {connector.connected ? (<>
          <Viro3DObject source={{ uri: pinkBody }} {...sharedProps} />
          {uriArray.map((uri, index) => index === hatIndex &&
            <Viro3DObject key={uri + index} source={{ uri }}{...sharedProps} />)}
          {uriMouthArray.map((uri, index) => index === mouthIndex &&
            <Viro3DObject key={uri + index} source={{ uri }}{...sharedProps} />)}
        </>) :

        <Viro3DObject source={baseBody} {...sharedProps} />}
    </ViroARScene>
  );
}
