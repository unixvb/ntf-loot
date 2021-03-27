'use strict';

import React, { Component } from 'react';

import {
  ViroARScene,
  ViroConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight
} from 'react-viro';

export default class ArScreen extends Component {
  constructor() {
    super();

    this.state = {
      text : "Initializing AR..."
    };

    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
                       position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

        <Viro3DObject
          source={require('./assets/low_poly_tree/Lowpoly_tree_sample.obj')}
          resources={[]}
          scale={[.01, .01, .01]}
          position={[0, -0.2, -0.5]}
          type="OBJ" />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

module.exports = ArScreen;
