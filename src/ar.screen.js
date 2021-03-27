'use strict';

import React, { Component } from 'react';

import {
  ViroARScene,
  ViroConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight
} from 'react-viro';

const sharedResources = [
  require('./assets/tex/black.png'),
  require('./assets/tex/blue.png'),
  require('./assets/tex/green.png'),
  require('./assets/tex/pink.png'),
];

const scaleSize = .005;

const sharedProps = {
  scale: [scaleSize, scaleSize, scaleSize],
  position: [0, -0.2, -0.5],
  type: "OBJ"
};

export default class ArScreen extends Component {
  constructor() {
    super();

    this.state = {
      text: "Initializing AR..."
    };

    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5}
                       outerAngle={90}
                       direction={[0, -1, -.2]}
                       position={[0, 3, 1]}
                       color="#ffffff"
                       castsShadow={true} />

        <Viro3DObject
          {...sharedProps}
          source={require(`./assets/body.obj`)}
          resources={[
            require(`./assets/body.mtl`),
            ...sharedResources
          ]}
        />

        <Viro3DObject
          {...sharedProps}
          source={require(`./assets/hat.obj`)}
          resources={[
            require(`./assets/hat.mtl`),
            ...sharedResources
          ]}
        />

        <Viro3DObject
          {...sharedProps}
          source={require(`./assets/eye.obj`)}
          resources={[
            require(`./assets/eye.mtl`),
            ...sharedResources
          ]}
        />

        <Viro3DObject
          {...sharedProps}
          source={require(`./assets/eyebrow_evil.obj`)}
          resources={[
            require(`./assets/eyebrow_evil.mtl`),
            ...sharedResources
          ]}
        />

        <Viro3DObject
          {...sharedProps}
          source={require(`./assets/mouth_smile.obj`)}
          resources={[
            require(`./assets/mouth_smile.mtl`),
            ...sharedResources
          ]}
        />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

module.exports = ArScreen;
