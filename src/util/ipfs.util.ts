const ipfsSuffix = 'ipfs://';
const ipfsGateway = 'https://gateway.pinata.cloud/ipfs/';

export const replaceIpfsSuffix = (str: string) => str.replace(ipfsSuffix, ipfsGateway);
