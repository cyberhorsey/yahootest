import type { Account } from "../domain/account";
import { AccountType } from "../domain/account";
import type { NFT } from "../domain/nft";
import fetchEthereumNfts from "./fetchEthereumNfts";
import fetchLoopringNfts from "./fetchLoopringNfts";

async function fetchNftsByAddress(account: Account): Promise<NFT[]> {
  if (account.accountType === AccountType.Ethereum) {
    const ethereumNfts: NFT[] = await fetchEthereumNfts(
      account.address,
      import.meta.env.VITE_ALCHEMY_API_KEY
    );
    const loopringNfts: NFT[] = await fetchLoopringNfts(account.address);

    return ethereumNfts.concat(loopringNfts);
  } else {
    return [];
  }
}

export default fetchNftsByAddress;
