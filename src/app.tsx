import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';

import { ArScene } from './ar-scene';
import { AppStyles } from './app.styles';

// TODO: Insert API key below
const sharedProps = {
  apiKey: "API_KEY_HERE",
}

enum NAVIGATION_SCREEN {
  ROOT = "ROOT",
  AR = "AR"
}

export const App = () => {
  const [navigatorType, setNavigatorType] = useState(NAVIGATION_SCREEN.ROOT);

  const handleArButtonPress = () => {
    setNavigatorType(NAVIGATION_SCREEN.AR);
  }

  switch (navigatorType) {
    case NAVIGATION_SCREEN.ROOT:
      return (
        <View style={AppStyles.outer}>
          <View style={AppStyles.inner}>

            <Text style={AppStyles.titleText}>
              View your character:
            </Text>

            <TouchableHighlight style={AppStyles.buttons}
                                onPress={handleArButtonPress}
                                underlayColor={'#68a0ff'}>

              <Text style={AppStyles.buttonText}>Connect wallet</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    case NAVIGATION_SCREEN.AR:
      return <ViroARSceneNavigator {...sharedProps} initialScene={{ scene: ArScene }} />;
  }
}
