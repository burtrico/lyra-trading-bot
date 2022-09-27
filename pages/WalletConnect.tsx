import Web3Modal from 'web3modal';
import WalletConnect from '@walletconnect/web3-provider'

const web3Modal = new Web3Modal({
    network: "mainnet",  //optional
    providerOptions: {
        walletconnect: {
            infuraId: "5340115be0da44bcafdaba9a53518b26";
        }
    }
});