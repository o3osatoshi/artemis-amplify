import React from "react";
import { ChainId, ExternallyOwnedAccounts } from "../domain/model/type";
import detectEthereumProvider from "@metamask/detect-provider";

export default class MetaMask extends React.Component<IProps, IState> {
  ethereum: any;

  constructor(props: IProps) {
    super(props);
    this.setAccounts = this.setAccounts.bind(this);
  }

  componentDidMount() {
    this.startApp().then(() => {
      this.setAccounts().then();
    });
  }

  async startApp(): Promise<void> {
    const provider = await detectEthereumProvider();
    if (provider) {
      if (provider !== window.ethereum) {
        console.error("Do you have multiple wallets installed?");
      }
      this.ethereum = window.ethereum;
      this.ethereum.on("connect", async (connectInfo: ConnectInfo) => {
        this.setAccounts().then();
        this.props.setChainId(Number(connectInfo.chainId));
      });
      this.ethereum.on(
        "accountsChanged",
        (accounts: ExternallyOwnedAccounts) => {
          this.props.setAccounts(accounts);
        }
      );
      this.ethereum.on("chainChanged", (chainId: string) => {
        this.props.setChainId(Number(chainId));
      });
      this.ethereum.on("disconnect", () => {
        this.props.setAccounts([""]);
        this.props.setChainId(ChainId.ethereum);
      });
    } else {
      console.log("Please install MetaMask!");
    }
  }

  async setAccounts(): Promise<void> {
    if (!this.ethereum) return;
    const accounts = await this.ethereum.request({
      method: "eth_requestAccounts",
    });
    this.props.setAccounts(accounts);
  }

  render() {
    let button;
    if (!this.props.accounts[0]) {
      button = <button onClick={this.setAccounts}>Connect MetaMask</button>;
    } else {
      button = <></>;
    }
    return <div>{button}</div>;
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
