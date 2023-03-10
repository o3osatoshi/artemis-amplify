import React from "react";
import { ChainId, ExternallyOwnedAccounts } from "../domain/model/type";
import detectEthereumProvider from "@metamask/detect-provider";

export default class ButtonMetaMask extends React.Component<IProps, IState> {
  private ethereum: any;

  constructor(props: IProps) {
    super(props);
    this.connectMetaMask = this.connectMetaMask.bind(this);
  }

  async connectMetaMask(): Promise<void> {
    const provider = await detectEthereumProvider();
    if (!provider) {
      const message = "Please install MetaMask!";
      alert(message);
      console.error(message);
      return;
    }

    if (provider !== window.ethereum) {
      const message = "Do you have multiple wallets installed?";
      alert(message);
      console.error(message);
      return;
    }

    this.ethereum = window.ethereum;
    this.requestAccounts().then();

    this.ethereum.on("connect", async (connectInfo: ConnectInfo) => {
      this.requestAccounts().then();
      this.props.setChainId(Number(connectInfo.chainId));
    });
    this.ethereum.on("accountsChanged", (accounts: ExternallyOwnedAccounts) => {
      this.props.setAccounts(accounts);
    });
    this.ethereum.on("chainChanged", (chainId: string) => {
      this.props.setChainId(Number(chainId));
    });
    this.ethereum.on("disconnect", () => {
      this.props.setAccounts([""]);
      this.props.setChainId(ChainId.ethereum);
    });
  }

  async requestAccounts(): Promise<void> {
    const accounts = await this.ethereum.request({
      method: "eth_requestAccounts",
    });
    this.props.setAccounts(accounts);
  }

  render() {
    let button;
    if (!this.props.accounts[0]) {
      button = <button onClick={this.connectMetaMask}>Connect MetaMask</button>;
    } else {
      button = <></>;
    }
    return <>{button}</>;
  }
}

interface IProps {
  accounts: ExternallyOwnedAccounts;
  setAccounts: (accounts: ExternallyOwnedAccounts) => void;
  chainId: ChainId;
  setChainId: (chainId: ChainId) => void;
}

interface IState {}

interface ConnectInfo {
  chainId: string;
}
