import { ChainConfigInterface } from './interfaces/chain-config.interface';

export const gray = '#ebe9e4';
export const blue = '#3778ff';

export const step = 8;

// CHAIN CONFIG

const bscTestnetConfig: ChainConfigInterface = {
  providerUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  contractAddress: '0x3F9Be37C85c7dc61bC5aF042ADf5c73796c374A4'
}

const ethTestnetConfig: ChainConfigInterface = {
  providerUrl: 'https://rinkeby.infura.io/v3/907809274b4c4f12a4e65741a8e3dcae',
  contractAddress: '0xa2d778b8604141ab4510bbf6f71d884406e5d150',
}

// when `false` using ETH Testnet
const isBSCTestnet = true;

export const { contractAddress, providerUrl } = isBSCTestnet ? bscTestnetConfig : ethTestnetConfig;
