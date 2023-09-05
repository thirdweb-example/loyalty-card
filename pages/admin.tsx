import { useContract, useNFTs } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useState } from "react";
import { Header } from "../components/Header";
import { NFTCard } from "../components/NFT";
import { CONTRACT_ADDRESS } from "../consts";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: nfts, isLoading, isError } = useNFTs(contract);
  const [tab, setTab] = useState("all");

  const tabOptions = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Burned",
      value: "burned",
    },
  ];

  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.tabs}>
        {tabOptions.map((option) => (
          <button
            key={option.value}
            className={tab === option.value ? styles.active : styles.inactive}
            onClick={() => setTab(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {nfts && (
        <div className={styles.nfts}>
          {tab === "all" &&
            nfts.map((nft) => (
              <NFTCard nft={nft} key={nft.metadata.id} adminView={true} />
            ))}

          {tab === "active" &&
            nfts
              .filter(
                (nft) =>
                  nft.owner !== "0x0000000000000000000000000000000000000000"
              )
              .map((nft) => (
                <NFTCard nft={nft} key={nft.metadata.id} adminView={true} />
              ))}

          {tab === "burned" &&
            nfts
              .filter(
                (nft) =>
                  nft.owner === "0x0000000000000000000000000000000000000000"
              )
              .map((nft) => (
                <NFTCard nft={nft} key={nft.metadata.id} adminView={true} />
              ))}
        </div>
      )}

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
    </main>
  );
};

export default Home;
