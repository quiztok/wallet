
const Network = {
  Offline: { rpc: 'offline', tx_explorer: null },
  'Local RPC': { rpc: '{LOCALHOST}', tx_explorer: null },
  'Ropsten Testnet': { rpc: '{INFURA}', tx_explorer: '{ETHSCAN_URL}' },
  'Main Net': { rpc: '{INFURA}', tx_explorer: '{ETHSCAN_URL}' },
};


module.exports = Network;
