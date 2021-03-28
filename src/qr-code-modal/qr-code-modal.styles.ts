import { StyleSheet } from 'react-native';
import { step } from '../config';

export const QrCodeModalStyles = StyleSheet.create({
  absolute: { position: 'absolute' },
  black: { backgroundColor: 'black' },
  center: { alignItems: 'center', justifyContent: 'center' },
  flex: { flex: 1 },
  fullWidth: { width: '100%' },
  noOverflow: { overflow: 'hidden' },
  row: { alignItems: 'center', flexDirection: 'row' },
  qrSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8 * step
  },
  qrSwitchText: {
    color: 'white',
    marginRight: 2 * step
  }
});
