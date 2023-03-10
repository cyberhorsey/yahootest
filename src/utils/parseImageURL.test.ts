import parseImageURL from "./parseImageURL";

it("if the image URL does not start with ipfs, it returns the url unchanged", function () {
  const imageURL = "https://internet.com";
  const expected = "https://internet.com";

  expect(parseImageURL(imageURL)).toBe(expected);
});

it("if the image URL is prefixed with ipfs://ipfs/, it removes it, and replaces it with https://ipfs.io/ipfs", function () {
  const imageURL = "ipfs://ipfs/myImage.png";
  const expected = "https://ipfs.io/ipfs/myImage.png";

  expect(parseImageURL(imageURL)).toBe(expected);
});

it("if the image URL is prefixed with ipfs:// it removes it, and replaces it with https://ipfs.io/ipfs", function () {
  const imageURL = "ipfs://myImage.png";
  const expected = "https://ipfs.io/ipfs/myImage.png";

  expect(parseImageURL(imageURL)).toBe(expected);
});
