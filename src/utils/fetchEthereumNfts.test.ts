import { NFT_TYPE_STRING } from "@loopring-web/loopring-sdk";
import { NFT, NFTType } from "../domain/nft";
import fetchEthereumNfts from "./fetchEthereumNfts";

const mockAlchemyClient = {
  nft: {
    getNftsForOwner: jest.fn(),
  },
};

jest.mock("alchemy-sdk", () => ({
  ...(jest.requireActual("alchemy-sdk") as object),
  Alchemy: function () {
    return mockAlchemyClient;
  },
}));

it("fetches ethereum layer 1 nfts from alchemy and converts them to domain NFT type", async function () {
  mockAlchemyClient.nft.getNftsForOwner.mockImplementation(function () {
    const alchemyNfts = [
      {
        title: "1name",
        description: "1desc",
        media: [
          {
            raw: "https://1.com",
          },
        ],
      },
      {
        title: "2name",
        description: "2desc",
        media: [
          {
            raw: "https://2.com",
          },
        ],
      },
    ];

    return {
      ownedNfts: alchemyNfts,
    };
  });

  const nfts = await fetchEthereumNfts("0x", "fakeApiKey");
  const expectedDomainNfts: NFT[] = [
    {
      imageURL: "https://1.com",
      name: "1name",
      description: "1desc",
      nftType: NFTType.Ethereum,
    },
    {
      imageURL: "https://2.com",
      name: "2name",
      description: "2desc",
      nftType: NFTType.Ethereum,
    },
  ];

  expect(nfts).toStrictEqual(expectedDomainNfts);
});
