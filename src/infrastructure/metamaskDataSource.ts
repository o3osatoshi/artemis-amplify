import MetaMaskSDK from "@metamask/sdk";
import Web3 from "web3";

export class MetaMaskDataSource {
  private readonly metaMaskSDK: MetaMaskSDK;
  private readonly ethereum;
  private readonly web3: Web3;

  constructor() {
    this.metaMaskSDK = new MetaMaskSDK();
    this.ethereum = this.metaMaskSDK.getProvider();
    if (!this.ethereum.isMetaMask) alert("Please install ButtonMetaMask");
    this.web3 = new Web3(this.ethereum);
  }

  async signMessage(message: string, account: string) {
    return await this.web3.eth.personal.sign(message, account, "");
  }

  async signMessageHash(
    account: string,
    contractAddress: string,
    tokenId: string,
    tokenValue: string
  ): Promise<string> {
    const signMessageHash = await this.web3.utils.soliditySha3(
      contractAddress,
      tokenId,
      tokenValue
    );
    if (!signMessageHash) throw new Error("Error signing message hash");
    return await this.web3.eth.personal.sign(signMessageHash, account, "");
  }
}
