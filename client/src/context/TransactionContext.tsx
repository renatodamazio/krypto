import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants.js";

export const TransactionContext = createContext("");

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log({
    provider,
    signer,
    transactionContract,
  });
};

export const TransactionsProvider = (props: any) => {
  const checkIfWalletidConnected = async () => {
    if (!ethereum) return alert("Please install metamask.");

    const account = await ethereum.request({ method: "eth_accounts" });

    console.log(account);
  };

  useEffect(() => {
    checkIfWalletidConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{ value: "text" }}>
      {" "}
      {props.children}{" "}
    </TransactionContext.Provider>
  );
};
