import { LOGIN_CACHING_TIME, LOGIN_KEY } from "../config/vars";
import { getLocalStorageItem, setLocalStorageItem } from "./local-storage.util";

export const setLoginStatus = (isLoggedIn) => {
  setLocalStorageItem(LOGIN_KEY, isLoggedIn, LOGIN_CACHING_TIME);
};

export const checkIsLogin = () => {
  const isLoggedIn = getLocalStorageItem(LOGIN_KEY);
  return isLoggedIn;
};

export const getLanguageProficiency = (level) => {
  return level > 90 ? 'Native' : level > 70 ? 'Proficient' : level > 50 ? 'Advanced' : 'Intermediate';
};

export const downloadBase64PDF = (base64String, fileName = 'document.pdf') => {
  // 1. Clean the string by stripping away any potential data URI prefix
  const cleanBase64 = base64String.replace(/^data:application\/pdf;base64,/, '');

  // 2. Decode base64 to binary string
  const byteCharacters = atob(cleanBase64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  // 3. Convert binary data array into an actual Uint8Array
  const byteArray = new Uint8Array(byteNumbers);

  // 4. Create a Blob object with the correct PDF MIME type
  const blob = new Blob([byteArray], { type: 'application/pdf' });

  // 5. Create a temporary URL pointing to the Blob
  const blobURL = URL.createObjectURL(blob);

  // 6. Create a hidden DOM anchor element to trigger the browser download
  const link = document.createElement('a');
  link.href = blobURL;
  link.download = fileName;

  // Append to body, trigger click, and immediately clean up the DOM
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 7. Revoke the object URL to free up browser memory allocation
  URL.revokeObjectURL(blobURL);
}