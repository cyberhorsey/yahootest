import {
  truncateDescription,
  MAX_DESCRIPTION_LENGTH,
} from "./truncateDescription";
it("returns an empty string when nothing is provided", function () {
  expect(truncateDescription("")).toBe("");
});

it("slices string to be the max description length + ... if greater than the max description length", function () {
  const longString = randomString(MAX_DESCRIPTION_LENGTH + 100);
  const expected = longString.slice(0, MAX_DESCRIPTION_LENGTH) + "...";
  expect(truncateDescription(longString)).toBe(expected);
});

it("returns the string itself, unchanged, if the string is shorter than max description length", function () {
  const shortString = "hello";
  const expected = "hello";
  expect(truncateDescription(shortString)).toBe(expected);
});

function randomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
