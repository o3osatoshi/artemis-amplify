import React from "react";
import { ChainId, ExternallyOwnedAccounts } from "../domain/model/type";

export default class MetaMask extends React.Component<IProps, IState> {
  private readonly ethereum: any;

  constructor(props: IProps) {
    super(props);

    this.ethereum = window.ethereum;
    if (!this.ethereum.isMetaMask) alert("Please install MetaMask");

    this.ethereum.on("connect", async (connectInfo: ConnectInfo) => {
      this.setAccounts().then();
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

    this.setAccounts = this.setAccounts.bind(this);
  }

  componentDidMount() {
    this.setAccounts().then();
  }

  async setAccounts(): Promise<void> {
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
