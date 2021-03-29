const ipfsSuffix = 'ipfs://';

// ipfsGateway + 'QmW1sgCyyReNmEdE9Tbb9r7brU7Pu5GpN9hNaiT4jLwXVd' + '/hat/hat-red.glb'
export const ipfsGateway = 'https://gateway.pinata.cloud/ipfs/';

export const replaceIpfsSuffix = (str: string) => str.replace(ipfsSuffix, ipfsGateway);
