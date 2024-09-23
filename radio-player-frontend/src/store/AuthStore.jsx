import React, { useState } from "react";
import cryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";
import sign from "jwt-encode";
import { makeAutoObservable } from "mobx";

const useAuthStore = () => {
  const [appState, setAppState] = useState(null);

  const saveToken = (appState) => {
    try {
      const encryptedToken = cryptoJS.AES.encrypt(
        sign(appState, "secret"),
        "radio"
      ).toString();
      localStorage.setItem("appState", encryptedToken);
      setAppState(appState);
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = () => {
    try {
      const appStateData = localStorage.getItem("appState");
      if (appStateData) {
        const bytes = cryptoJS.AES.decrypt(appStateData, "radio");
        const originalText = bytes.toString(cryptoJS.enc.Utf8);
        setAppState(jwtDecode(originalText));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeToken = () => {
    try {
      localStorage.removeItem("appState");
      setAppState(null);
    } catch (error) {
      console.log(error);
    }
  };

  makeAutoObservable({ appState, saveToken, getToken, removeToken });

  return {
    appState,
    saveToken,
    getToken,
    removeToken,
  };
};

export default useAuthStore;
