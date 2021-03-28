import { StyleSheet } from 'react-native';
import { step } from '../config';

export const closeIconSize = 4 * step;

export const NavigatorStyles = StyleSheet.create({
  closeIcon: {
    position: 'absolute',
    top: 7 * step,
    right: 2 * step,
    width: closeIconSize,
    height: closeIconSize,
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
