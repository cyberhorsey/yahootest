const removePrefixIfFound = (value, prefix) =>
  value.startsWith(prefix) ? value.slice(prefix.length) : value;

function parseImageURL(imageURL: string): string {
  if (!imageURL.startsWith("ipfs")) return imageURL;

  imageURL = removePrefixIfFound(imageURL, "ipfs://ipfs/");
  imageURL = removePrefixIfFound(imageURL, "ipfs://");
  imageURL = `https://ipfs.io/ipfs/${imageURL}`;
  return imageURL;
}

export default parseImageURL;
