import { Key, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";
interface TransactionCardInfo {
  addressTo: string;
  addressFrom: string;
  timestamp: number;
  message: string;
  keyword: string;
  amount: number;
  url: string;
}

const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}: TransactionCardInfo) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div
      className="bg-[#181918] m-4 flex flex-1 
    2xl:min-w-[415px]
    2xl:max-w-[500px]
    sm:min-w-[270px]
    sm:max-w-[300px]
    flex-col p-3 rounded-md hover:shadow-2xl
  "
    >
      <div className="flex flex-row items-center w-full mt-3">
        <div className="flex w-full mb-6 p-2 flex-col">
          <a
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noopener noreferer"
          >
            <p className="text-white text-base ">
              From: {addressFrom && shortenAddress(addressFrom)}
            </p>
          </a>

          <a
            href={`https://ropsten.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noopener noreferer"
          >
            <p className="text-white text-base ">
              To: {addressTo && shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base w-full">Amount: {amount} ETH</p>

          {message && (
            <>
              <br />
              <p className="text-white text-base ">Message: {message}</p>
            </>
          )}

          <img
            src={gifUrl || url}
            alt="GIf"
            className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
          />

          <div className="bg-black p-3 px-5 -mt-5 w-max rounded-3xl shadow-2xl">
            <p className="text-[#37c7de] font-bold">{timestamp}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Transactions() {
  const { currentAccount, transactions } = useContext<any>(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect to your account to see the latests changes
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center text-white mt-10">
          {transactions
            .reverse()
            .map(
              (
                transaction: JSX.IntrinsicAttributes,
                index: Key | null | undefined
              ) => (
                <TransactionCard key={index} {...transaction} />
              )
            )}
        </div>
      </div>
    </div>
  );
}
