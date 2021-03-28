import { Qrcode, RenderQrcodeModalProps, WalletService, WalletServiceRow } from '@walletconnect/react-native-dapp';
import * as React from 'react';
import { useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { QrCodeModalStyles } from './qr-code-modal.styles';

const useNativeDriver = Platform.OS !== 'web';
const { width, height } = Dimensions.get('window');

const walletsListWidth = width * 0.9;
const walletsListHeight = height * 0.9;

const qrCodeSize = Math.min(walletsListWidth, walletsListHeight);

export const QrCodeModal =
  ({
    visible,
    walletServices,
    connectToWalletService,
    uri,
    onDismiss,
    division = 1,
  }: RenderQrcodeModalProps & { readonly division: number }): JSX.Element => {
    const [shouldRenderQrcode, setShouldRenderQrcode] = useState(Platform.OS === 'web');

    const shouldConnectToWalletService = React.useCallback(
      (walletService: WalletService) => connectToWalletService(walletService, uri),
      [connectToWalletService, uri],
    );
    const { opacity, logo, icons } = React.useMemo(() => ({
      opacity: new Animated.Value(0),
      logo: new Animated.Value(0),
      icons: new Animated.Value(0),
    }), []);
    const walletServiceRows = React.useMemo((): readonly (readonly WalletService[])[] => {
      return [...Array(Math.ceil(walletServices.length / division))]
        .map((_, i) => walletServices.slice(i * division, i * division + division));
    }, [walletServices, division]);

    const shouldAnimate = React.useCallback((totalDuration: number, direction: boolean) => {
      const sequence = [
        Animated.timing(opacity, {
          toValue: direction ? 1 : 0,
          duration: totalDuration * 0.5,
          useNativeDriver,
        }),
        Animated.delay(direction ? 0 : totalDuration * 0.4),
        Animated.parallel([
          Animated.sequence([
            Animated.delay(totalDuration * (direction ? 0.2 : 0)),
            Animated.timing(icons, {
              toValue: direction ? 1 : 0,
              duration: totalDuration * (direction ? 0.3 : 0.5),
              useNativeDriver,
            }),
          ]),
          Animated.timing(logo, {
            toValue: direction ? 1 : 0,
            duration: totalDuration * 0.5,
            useNativeDriver,
          }),
        ]),
      ];
      if (!direction) {
        sequence.reverse();
      }
      Animated.sequence(sequence).start();
    }, [opacity, logo, icons, division]);

    React.useEffect(() => {
      shouldAnimate(visible ? 600 : 600, visible);
    }, [shouldAnimate, visible]);

    const keyExtractor = React.useCallback((walletServiceRow: readonly WalletService[]): string => {
      return `k${walletServiceRows.indexOf(walletServiceRow)}`;
    }, [walletServiceRows]);

    const renderItem = React.useCallback(({ item, index }): JSX.Element => {
      return (
        <WalletServiceRow
          key={`k${index}`}
          style={{ opacity: icons }}
          division={division}
          walletServices={item}
          width={width}
          height={walletsListHeight * 0.1}
          connectToWalletService={shouldConnectToWalletService}
        />
      );
    }, [walletsListWidth, width, division, icons, shouldConnectToWalletService]);

    return (
      <Animated.View
        style={[
          QrCodeModalStyles.absolute,
          QrCodeModalStyles.noOverflow,
          {
            width,
            height,
            opacity,
            zIndex: 1000
          },
        ]}
        pointerEvents={visible ? 'box-none' : 'none'}>
        {/* backdrop */}
        <View style={StyleSheet.absoluteFill}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onDismiss} activeOpacity={0.98}>
            <Animated.View
              style={[QrCodeModalStyles.flex, { opacity: Animated.multiply(opacity, 0.95) }, QrCodeModalStyles.black]} />
          </TouchableOpacity>
        </View>
        {/* */}
        <View style={[StyleSheet.absoluteFill, QrCodeModalStyles.center, { justifyContent: 'space-between' }]}
              pointerEvents={visible ? 'box-none' : 'none'}>
          <View style={QrCodeModalStyles.qrSwitchContainer}>
            <Text style={QrCodeModalStyles.qrSwitchText}>Show QR code:</Text>
            <Switch value={shouldRenderQrcode}
                    onValueChange={setShouldRenderQrcode} />
          </View>
          {shouldRenderQrcode ? (
            <Animated.View style={{ width: qrCodeSize, height: qrCodeSize }}>
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  QrCodeModalStyles.center,
                  { opacity: icons, transform: [{ scale: icons }] },
                ]}>
                <Qrcode uri={uri} size={qrCodeSize * 0.8} />
              </Animated.View>
            </Animated.View>
          ) : (
            <FlatList
              scrollEnabled={visible}
              showsVerticalScrollIndicator={visible}
              keyExtractor={keyExtractor}
              style={QrCodeModalStyles.flex}
              data={walletServiceRows}
              renderItem={renderItem}
            />
          )}
          <View />
        </View>
      </Animated.View>
    );
  }
