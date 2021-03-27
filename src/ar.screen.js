'use strict';

import React, { Component } from 'react';

import {
  ViroARScene,
  ViroConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight
} from 'react-viro';

const scaleSize = .005;

const sharedProps = {
  scale: [scaleSize, scaleSize, scaleSize],
  position: [0, -0.5, -1],
  type: "GLB"
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
                       intensity={100}
                       castsShadow={true} />

        <Viro3DObject
          source={{ uri: 'https://gateway.pinata.cloud/ipfs/QmXvxGf3WZvPJfXUAE4SNvwrPzAmwS2W6dP1EdGHBGV9ge/body.glb' }}
          {...sharedProps}
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
