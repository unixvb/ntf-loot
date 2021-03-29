import { StyleSheet } from 'react-native';
import { step } from '../config';

export const iconSize = 4 * step;

const sharedIconStyles = {
  position: 'absolute',
  width: iconSize,
  height: iconSize,
}

export const NavigatorStyles = StyleSheet.create({
  closeIcon: {
    ...sharedIconStyles,
    top: 7 * step,
    right: 2 * step,
  },
  leftIcon: {
    ...sharedIconStyles,
    top: 14 * step,
    left: 2 * step,
  },
  rightIcon: {
    ...sharedIconStyles,
    top: 14 * step,
    right: 2 * step,
  },
  connectContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  connectButton: {
    backgroundColor: '#008CBA',
    borderRadius: 0.5 * step,
    paddingVertical: 2 * step,
    paddingHorizontal: 4 * step
  },
  connectButtonText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center'
  }
});
