import { ethers } from "ethers";
import type { Account } from "../domain/account";
import { AccountType } from "../domain/account";
import type { NFT } from "../domain/nft";
import account from "../store/account";
import nfts from "../store/nfts";
import fetchNftsByAddress from "./fetchNftsByAddress";
type EthereumWindow = {
  ethereum: any; // todo: get rid of any typing
};

async function connectMetamask() {
  const provider = new ethers.providers.Web3Provider(
    (window as any as EthereumWindow).ethereum
  );

  const accounts = await provider.send("eth_requestAccounts", []);
  const providedAccount = accounts[0];
  // we need to set account into a store, so that we can use it elsewhere.
  const domainAccount: Account = {
    address: providedAccount,
    accountType: AccountType.Ethereum,
  };
  account.set(domainAccount);
  const fetchedNfts: NFT[] = await fetchNftsByAddress(domainAccount);
  console.log("fetched nfts", fetchedNfts);
  nfts.set(fetchedNfts);
}

export default connectMetamask;
