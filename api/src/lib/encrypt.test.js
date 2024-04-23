import { encrypt, decrypt } from "./encrypt";

describe("encryption", () => {
  it("encrypts and decrypts a string", () => {
    const data = "hello world";
    const encrypted = encrypt(data);
    const decrypted = decrypt(encrypted);
    expect(decrypted).toEqual(data);
    expect(encrypted).not.toEqual(data);
  });
});
