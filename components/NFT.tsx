import {
  NFT,
  ThirdwebNftMedia,
  Web3Button,
  useContract,
} from "@thirdweb-dev/react";
import Image from "next/image";
import { useState, type FC } from "react";
import { CONTRACT_ADDRESS } from "../consts";
import styles from "../styles/Home.module.css";

interface NFTProps {
  nft: NFT;
  adminView?: boolean;
}

export const NFTCard: FC<NFTProps> = ({ nft, adminView }) => {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const [points, setPoints] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const id = nft.metadata.id;

  const update = async () => {
    try {
      // create the new metadata of the NFT
      const metadata = {
        ...nft.metadata,
        attributes: [
          // @ts-ignore
          ...nft.metadata.attributes.filter(
            // @ts-ignore
            (attribute) => attribute.trait_type !== "points"
          ),
          {
            trait_type: "points",
            value: points,
          },
        ],
      };

      // call the erc721.update function with the new metadata
      await contract?.erc721.update(nft.metadata.id, metadata);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div key={nft.metadata.id} className={styles.nft}>
      {nft.metadata.image ? (
        <ThirdwebNftMedia metadata={nft.metadata} />
      ) : (
        <Image
          src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"
          alt=""
          width="360"
          height="200"
          style={{
            objectFit: "contain",
          }}
        />
      )}
      <h1>{nft.metadata.name}</h1>
      <p>{nft.metadata.description}</p>

      {nft.metadata.attributes && (
        <ul>
          {/* @ts-ignore */}
          {nft.metadata.attributes.map((attribute) => (
            <li key={attribute.trait_type}>
              <strong>{attribute.trait_type}:</strong> {attribute.value}
            </li>
          ))}
        </ul>
      )}

      {adminView ? (
        <>
          <p>
            <strong>Token ID:</strong> {nft.metadata.id}
          </p>
          <p>Owner: {nft.owner}</p>
          {nft.owner !== "0x0000000000000000000000000000000000000000" && (
            <Web3Button
              // Use the revoke function of the erc721 contract to revoke the NFT
              action={(contract) => contract.erc721.revoke(id)}
              contractAddress={CONTRACT_ADDRESS}
            >
              Revoke
            </Web3Button>
          )}

          {isEditing ? (
            <>
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
              />
              <Web3Button
                action={() => update()}
                contractAddress={CONTRACT_ADDRESS}
              >
                Update
              </Web3Button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className={styles.button}
            >
              Edit
            </button>
          )}
        </>
      ) : (
        <Web3Button
          // Use the cancel function of the erc721 contract to cancel the NFT
          action={(contract) => contract.erc721.cancel(id)}
          contractAddress={CONTRACT_ADDRESS}
        >
          Cancel
        </Web3Button>
      )}
    </div>
  );
};
