import React from "react";
import { ChainId, ExternallyOwnedAccounts } from "../domain/model/type";
import MetaMask from "../components/MetaMask";

export default class User extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      accounts: [],
      chainId: ChainId.ethereum,
    };
    this.setAccounts = this.setAccounts.bind(this);
    this.setChainId = this.setChainId.bind(this);
  }

  setAccounts(accounts: ExternallyOwnedAccounts) {
    this.setState((prevState) => {
      const nextState: IState = prevState;
      nextState.accounts = accounts;
      return nextState;
    });
  }

  setChainId(chainId: ChainId) {
    this.setState((prevState) => {
      const nextState: IState = prevState;
      nextState.chainId = chainId;
      return nextState;
    });
  }

  render() {
    return (
      <>
        <h2>User</h2>
        <MetaMask
          accounts={this.state.accounts}
          setAccounts={this.setAccounts}
          chainId={this.state.chainId}
          setChainId={this.setChainId}
        />
      </>
    );
  }
}

interface IProps {}

interface IState {
  accounts: ExternallyOwnedAccounts;
  chainId: ChainId;
}
