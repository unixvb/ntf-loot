import Web3 from 'web3';

import { contractAddress, providerUrl } from '../config';

const contractJson = require('../abi.json');

export const w3 = new Web3(providerUrl);

export const LootContract = new w3.eth.Contract(contractJson, contractAddress);
