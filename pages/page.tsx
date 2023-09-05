import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { CONTRACT_ADDRESS } from "../consts";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);

  const generate = async () => {
    try {
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
    }
  };

  return (
    <main className={styles.container}>
      <Web3Button action={() => generate()} contractAddress={CONTRACT_ADDRESS}>
        Generate NFT
      </Web3Button>
    </main>
  );
};

export default Home;
