import React, { useEffect, useState } from 'react';
import { ViroARSceneNavigator } from 'react-viro';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

import CloseIcon from '../assets/close.svg';
import LeftArrowIcon from '../assets/left-arrow.svg';
import RightArrowIcon from '../assets/right-arrow.svg';

import { iconSize, NavigatorStyles } from './navigator.styles';
import { lootsArray } from '../types/loots.enum';
import { LootContract } from '../util/contract.util';
import { ArScene } from '../ar-scene';
import { step } from '../config';
import { ActiveModelState } from './state-provider';

const maxHatIndex = 4;
const maxMouth = 2;

export const Navigator = () => {
  const connector = useWalletConnect();
  const [balances, setBalances] = useState<(number | string) []>([]);

  const [hatIndex, setHatIndex] = useState(0);
  const [mouthIndex, setMouthIndex] = useState(0);

  useEffect(() => {
    if (connector.connected) {
      const getAvailableTokens = async () => {
        let newBalances: (number | string)[] = new Array(lootsArray.length).fill(0);
        let promises: Promise<any>[] = [];

        lootsArray.map(loot => promises.push(LootContract.methods.balanceOf(connector.accounts[0], loot).call().then((balance: string) => {
          return {
            id: loot,
            amount: balance
          }
        })));

        await Promise.all(promises).then(balances_data => {
          for (let data of balances_data)
            newBalances[data.id] = data.amount

          setBalances(newBalances);
          return newBalances;
        })
      }

      // getAvailableTokens();
    }
  }, [connector.connected]);


  const handleCloseButtonPress = () => Alert.alert(
    "Do you really want disconnect your wallet?",
    "We will remove all data about you",
    [
      {
        text: "Yes",
        onPress: () => connector.killSession(),
        style: "cancel"
      },
      {
        text: "No",
        onPress: () => void 0
      }
    ]
  );

  const hatLeftButtonPress = () => setHatIndex(index => Math.max(index - 1, 0));
  const hatRightButtonPress = () => setHatIndex(index => Math.min(index + 1, maxHatIndex));

  const mouthLeftButtonPress = () => setMouthIndex(index => Math.max(index - 1, 0));
  const mouthRightButtonPress = () => setMouthIndex(index => Math.min(index + 1, maxMouth));

  return <ActiveModelState.Provider value={{ hatIndex, mouthIndex }}>

    <ViroARSceneNavigator initialScene={{ scene: ArScene }} />

    {connector.connected &&
    <>
      <TouchableOpacity
        style={NavigatorStyles.closeIcon}
        onPress={handleCloseButtonPress}
      >
        <CloseIcon width={iconSize} height={iconSize} />
      </TouchableOpacity>

      <TouchableOpacity
        style={NavigatorStyles.leftIcon}
        onPress={hatLeftButtonPress}
      >
        <LeftArrowIcon width={iconSize} height={iconSize} />
      </TouchableOpacity>

      <TouchableOpacity
        style={NavigatorStyles.rightIcon}
        onPress={hatRightButtonPress}
      >
        <RightArrowIcon width={iconSize} height={iconSize} />
      </TouchableOpacity>


      <TouchableOpacity
        style={[NavigatorStyles.leftIcon, { top: 20 * step }]}
        onPress={mouthLeftButtonPress}
      >
        <LeftArrowIcon width={iconSize} height={iconSize} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[NavigatorStyles.rightIcon, { top: 20 * step }]}
        onPress={mouthRightButtonPress}
      >
        <RightArrowIcon width={iconSize} height={iconSize} />
      </TouchableOpacity>
    </>
    }

    {!connector.connected &&
    <View style={NavigatorStyles.connectContainer}>
      <TouchableOpacity
        style={NavigatorStyles.connectButton}
        onPress={() => connector.connect()}
      >
        <Text style={NavigatorStyles.connectButtonText}>Connect the Wallet</Text>
      </TouchableOpacity>
    </View>
    }
  </ActiveModelState.Provider>;
}
