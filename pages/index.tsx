import {
  Web3Button,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { NextPage } from "next";
import { Header } from "../components/Header";
import { NFTCard } from "../components/NFT";
import { CONTRACT_ADDRESS } from "../consts";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: nfts, isLoading, isError } = useOwnedNFTs(contract, address);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/generate-sig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
        }),
      });

      const data = await res.json();

      await contract?.erc721.signature.mint(data.signedPayload);
      alert("NFT minted!");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <Header />
      <Web3Button
        action={() => generate()}
        contractAddress={CONTRACT_ADDRESS}
        isDisabled={loading}
      >
        {loading ? "Generating..." : "Generate NFT"}
      </Web3Button>

      {nfts && (
        <div className={styles.nfts}>
          {nfts.map((nft) => (
            <NFTCard nft={nft} key={nft.metadata.id} />
          ))}
        </div>
      )}

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
    </main>
  );
};

export default Home;
