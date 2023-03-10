import type { Account } from "../domain/account";
import { AccountType } from "../domain/account";
import type { NFT } from "../domain/nft";
import account from "../store/account";
import nfts from "../store/nfts";
import fetchNftsByAddress from "./fetchNftsByAddress";

async function connectPhantom() {
  // step 1, lets connect to phantom wallet.
  // step 2, lets worry about how to change fetchNftsByAddress, and our account store, which assume
  // an ethereum address right now.

  // TODO: typings for window object to contain phantom
  const phantom = await (window as any).phantom.solana.connect();
  console.log((window as any).phantom.solana);
  const address = (window as any).phantom.solana.publicKey.toString();
  const domainAccount: Account = {
    accountType: AccountType.Solana,
    address: address,
  };
  account.set(domainAccount);

  const fetchedNfts: NFT[] = await fetchNftsByAddress(domainAccount);
  console.log("solana fetched nfts", fetchedNfts);
  nfts.set(fetchedNfts);
}

export default connectPhantom;
