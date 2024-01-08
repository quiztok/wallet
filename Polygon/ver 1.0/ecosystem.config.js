module.exports = {
    apps: [{
    name: 'solana-wallet',
    script: '/home/quiztok/solanaWallet/web.js',
    instances: 0,
    exec_mode: 'cluster',
    wait_ready: false,
    listen_timeout: 50000,
    kill_timeout: 5000
    }]
  }
