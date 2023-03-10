// we dont actually want to call imx when we do our tests.
// we want to mock it out. so we need to specifically mock out
// every function we call from IMX.

import { NFT, NFTType } from "../domain/nft";
import fetchImxNfts from "./fetchImxNfts";

// currently we call new ImmutableX().assetApi.listAssets();
const mockImxClient = {
  assetApi: {
    listAssets: jest.fn(),
  },
};

jest.mock("@imtbl/core-sdk", () => ({
  ...(jest.requireActual("@imtbl/core-sdk") as object),
  ImmutableX: function () {
    return mockImxClient;
  },
}));

it("fetches imx nfts, converts them to the domain NFT type", async function () {
  mockImxClient.assetApi.listAssets.mockImplementation(function () {
    const imxNfts = [
      {
        image_url: "https://1.com",
        collection: {
          name: "1desc",
        },
        name: "1name",
      },
      {
        image_url: "https://2.com",
        collection: {
          name: "2desc",
        },
        name: "2name",
      },
    ];

    return {
      data: {
        result: imxNfts,
      },
    };
  });

  const expectedDomainNfts: NFT[] = [
    {
      imageURL: "https://1.com",
      name: "1name",
      description: "1desc",
      nftType: NFTType.IMX,
    },
    {
      imageURL: "https://2.com",
      name: "2name",
      description: "2desc",
      nftType: NFTType.IMX,
    },
  ];

  // we call fetchImxNfts, and we dont care about the address, because we arent actually
  // calling the API.
  const gotNfts = await fetchImxNfts("0x");
  // we want to EXPECT the response we got from IMX, is an array of DOMAIN nfts. ie:
  // we want to test we converted the response correctly.
  expect(gotNfts).toStrictEqual(expectedDomainNfts);
});
