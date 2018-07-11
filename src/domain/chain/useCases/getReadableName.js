export default function getReadableName (chain) {
  const readableNetworksMap = {
    ethmain: 'Ethereum',
    ethropst: 'Ethereum',
    ethtest: 'Mocknet',
    bitcoin: 'Bitcoin',
    mocknet: 'Mocknet',
    regtest: 'Mocknet',
    testnet: 'Mocknet'
  };

  return readableNetworksMap[chain];
}
