import { ethers } from "ethers";
import type { NFT } from "../domain/nft";
import account from "../store/account";
import nfts from "../store/nfts";
import fetchNftsByAddress from "./fetchNftsByAddress";
import detectGamestopProvider from "@gamestopnft/detect-gamestop-provider";
import type { Account } from "../domain/account";
import { AccountType } from "../domain/account";

async function connectGME() {
  const gmeProvider = await detectGamestopProvider();
  const provider = new ethers.providers.Web3Provider(gmeProvider);

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

export default connectGME;
