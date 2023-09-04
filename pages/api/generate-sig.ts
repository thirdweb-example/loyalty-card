import { PayloadToSign721withQuantity, ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import { CONTRACT_ADDRESS } from "../../consts";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.WALLET_PRIVATE_KEY!,
      "mumbai",
      {
        secretKey: process.env.TW_SECRET_KEY!,
      }
    );

    const contract = await sdk.getContract(CONTRACT_ADDRESS);

    const address = req.body.address;

    const payload: PayloadToSign721withQuantity = {
      to: address,
      metadata: {
        name: "My loyalty card",
        description: "Some loyalty card description. Too lazy to write one.",
        image:
          "https://15065ae3c21e0bff07eaf80b713a6ef0.ipfscdn.io/ipfs/bafybeie2mhmbriq4ndtl3i7enkovlm6njycdutobw4jczixdbfoensranm/blue_square.png",
        attributes: [
          {
            trait_type: "color",
            value: "blue",
          },
          {
            trait_type: "points",
            value: 100,
          },
        ],
      },
    };

    const signedPayload = await contract.erc721.signature.generate(payload);

    return res.status(200).json({ signedPayload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
