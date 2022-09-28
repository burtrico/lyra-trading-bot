import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { Web3Provider } from '../node_modules/@ethersproject/providers/src.ts/web3-provider'
import {CoinbaseWalletSDK} from "@coinbase/wallet-sdk";
import { useState } from 'react';

export const providerOptions = {
    coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
            appName: "Web3Modal",
            infuraId: {10: "https://optimism-mainnet.infura.io/v3/5340115be0da44bcafdaba9a53518b26"}
        }
    }
}

export async function ConnectWallet() {
    const [web3ModalProvider, setWeb3Provider] = useState<Web3Provider>(null)

    try {
        let web3Modal = new Web3Modal({
            cacheProvider: false,
            providerOptions, 
        });
        const web3ModalInstance = await web3Modal.connect();
        const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
        if(web3ModalProvider) {
            setWeb3Provider(web3ModalProvider)
        }
        console.log(web3ModalProvider);
    } catch(error){
        console.error(error);
    }
}


