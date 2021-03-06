import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants.js";

export const TransactionContext = createContext<any>([]);

const { ethereum } = (window as any);

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionsProvider = (props: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<any>([]);
  const [transactionCount, setTransactionCount] = useState<any>(
    localStorage.getItem("transactionCoung")
  );
  const [currentAccount, setCurrentAccount] = useState<Object>();
  const [formData, setFormData] = useState<Object>({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const transactionContract = getEthereumContract();
      const availableTransactions =
        await transactionContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction:any) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,  
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amout: parseInt(transaction.amout._hex) / (10 ** 18)
        }))

      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletidConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No Accounts found.");
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkIfWalletidConnected();
    checkIfTransactionsExist();
  }, []);

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.transactionCount;

      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (err) {
      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
      throw new Error("No ethereum object.");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const { addressTo, amount, keyword, message }: any = formData;

      const transactionContract = getEthereumContract();
      const parseAmout = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // 21000 GWEI
            value: parseAmout._hex, // 0.00001
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockChain(
        addressTo,
        parseAmout,
        message,
        keyword
      );

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);

      await transactionHash.wait();

      setIsLoading(false);
      console.log(`Done - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.transactionCount();
      setTransactionCount(transactionCount.toNumber());

      (window as any).reload();
    } catch (error) {
      throw new Error("No ethereum object");
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        isLoading,
        formData,
        transactions,
        setFormData,
        handleChange,
        sendTransaction,
      }}
    >
      {" "}
      {props.children}{" "}
    </TransactionContext.Provider>
  );
};
