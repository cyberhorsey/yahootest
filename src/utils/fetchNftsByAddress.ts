import type { Account } from "../domain/account";
import { AccountType } from "../domain/account";
import type { NFT } from "../domain/nft";
import fetchEthereumNfts from "./fetchEthereumNfts";
import fetchImxNfts from "./fetchImxNfts";
import fetchLoopringNfts from "./fetchLoopringNfts";

async function fetchNftsByAddress(account: Account): Promise<NFT[]> {
  if (account.accountType === AccountType.Ethereum) {
    const imxNfts: NFT[] = await fetchImxNfts(account.address);
    const ethereumNfts: NFT[] = await fetchEthereumNfts(
      account.address,
      import.meta.env.VITE_ALCHEMY_API_KEY
    );
    const loopringNfts: NFT[] = await fetchLoopringNfts(account.address);

    return imxNfts.concat(ethereumNfts, loopringNfts);
  } else {
    return [];
  }
}

export default fetchNftsByAddress;
