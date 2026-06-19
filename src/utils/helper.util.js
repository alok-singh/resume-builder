import { LOGIN_CACHING_TIME, LOGIN_KEY } from "../config/vars";
import { getLocalStorageItem, setLocalStorageItem } from "./local-storage.util";

export const setLoginStatus = (isLoggedIn) => {
  setLocalStorageItem(LOGIN_KEY, isLoggedIn, LOGIN_CACHING_TIME);
};

export const checkIsLogin = () => {
  const isLoggedIn = getLocalStorageItem(LOGIN_KEY);
  return isLoggedIn;
};