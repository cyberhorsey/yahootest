import { NFTType, type NFT } from "../domain/nft";
import { Network, Alchemy } from "alchemy-sdk";

async function fetchEthereumNfts(
  address: string,
  apiKey: string
): Promise<NFT[]> {
  const settings = {
    apiKey: apiKey,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(settings);

  const nfts = await alchemy.nft.getNftsForOwner(address);

  // now i have the response from alchemy. but the response from alchemy is gonna be of whatever]
  // TYPE alchemy said. nto this custom NFT type I just made.
  // and i want ALL my functions that get nfts, to return the SAME type, so they're easy to deal with.
  // for instance, i cant have a function that returns AlchemyNFTs, then IMXNFts, and they all
  // have different properties. thats insane to deal with.

  const domainNfts: NFT[] = [];
  // i wnat to loop over the response from alchemy, and convert each entry into the type I want to use.
  nfts.ownedNfts.forEach(function (alchemyNft) {
    if (!alchemyNft.title) return;
    const media = alchemyNft.media;
    const imageURL = media.length ? media[0].raw : "";

    const nft: NFT = {
      name: alchemyNft.title,
      description: alchemyNft.description,
      imageURL: imageURL,
      nftType: NFTType.Ethereum,
    };

    domainNfts.push(nft);
  });

  return domainNfts;
}

export default fetchEthereumNfts;
