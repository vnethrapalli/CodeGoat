require('dotenv').config();
import CryptoJS from "crypto-js";

export const encrypt = (data) => {
  let ciphertext = CryptoJS.AES.encrypt(data, process.env.AES_KEY).toString();
  return ciphertext;
}

export const decrypt = (data) => {
  let bytes = CryptoJS.AES.decrypt(data, process.env.AES_KEY);
  let originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}
