enum NFTType {
  Ethereum,
  IMX,
  Solana,
  Loopring,
}

type NFT = {
  imageURL: string;
  name: string;
  description: string;
  nftType: NFTType;
};

export type { NFT };
export { NFTType };
