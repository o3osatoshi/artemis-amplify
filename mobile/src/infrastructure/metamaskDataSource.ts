import MetaMaskSDK from '@metamask/sdk';
import {Linking} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import Web3 from 'web3';

export default class MetaMaskDataSource {
  MMSDK: MetaMaskSDK;
  ethereum: any;
  web3: Web3;

  constructor() {
    this.MMSDK = new MetaMaskSDK({
      openDeeplink: link => {
        Linking.openURL(link); // Use React Native Linking method or your favourite way of opening deeplinks
      },
      timer: BackgroundTimer, // To keep the app alive once it goes to background
      dappMetadata: {
        name: 'My App', // The name of your application
        url: 'https://myapp.com', // The url of your website
      },
    });
    this.ethereum = this.MMSDK.getProvider();
    this.web3 = new Web3(this.ethereum);
  }

  async getBalance() {
    const accounts = await this.ethereum.request({
      method: 'eth_requestAccounts',
    });
    console.log(accounts);
    return await this.web3.eth.getBalance(this.ethereum.selectedAddress);
  }
}
