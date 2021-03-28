import React, { useState } from 'react';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import {
  Text,
  View,
  TouchableHighlight,
  Button,
} from 'react-native';
import {
  ViroARSceneNavigator
} from 'react-viro';

import { ArScene } from './ar-scene';
import { NavigatorStyles } from './navigator.styles';

// TODO: Insert API key below
const sharedProps = {
  apiKey: "API_KEY_HERE",
}

enum NAVIGATION_SCREEN {
  ROOT = "ROOT",
  AR = "AR"
}

export const Navigator = () => {
  const connector = useWalletConnect();
  const [navigatorType, setNavigatorType] = useState(NAVIGATION_SCREEN.ROOT);

  const handleArButtonPress = () => {
    setNavigatorType(NAVIGATION_SCREEN.AR);
  }

  switch (navigatorType) {
    case NAVIGATION_SCREEN.ROOT:
      return (
        <View style={NavigatorStyles.outer}>
          <View style={NavigatorStyles.inner}>

            <Text style={NavigatorStyles.titleText}>
              View your character:
            </Text>

            <TouchableHighlight style={NavigatorStyles.buttons}
                                onPress={handleArButtonPress}
                                underlayColor={'#68a0ff'}>

              <Text style={NavigatorStyles.buttonText}>Connect wallet</Text>

            </TouchableHighlight>
            {!connector.connected && <Button title="Connect" onPress={() => connector.connect()} />}
          </View>
        </View>
      );
    case NAVIGATION_SCREEN.AR:
      return <ViroARSceneNavigator {...sharedProps} initialScene={{ scene: ArScene }} />;
  }
}
