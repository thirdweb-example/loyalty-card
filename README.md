> [!Important]  
> This repository is referencing the `mumbai` chain.
> 
> `Mumbai` [is deprecated since 08/04/2024](https://blog.thirdweb.com/deprecation-of-mumbai-testnet/), meaning the code in this repository will no longer work out of the box.
>
> You can still use this repository, however you will have to switch any references to `mumbai` to another chain.

# Loyalty Card Template

This project demonstrates how you can create loyalty cards for your customers using NFTs.

## Installation

Install the template with [thirdweb create](https://portal.thirdweb.com/cli/create)

```bash
npx thirdweb create --template loyalty-card
```

## Set up

- Deploy or import an already deployed Loyalty card contract on thirdweb dashboard.
- Update the contract address in the [consts.ts](./consts.ts) file to use your contract address.

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

```bash
NEXT_PUBLIC_TEMPLATE_CLIENT_ID=
TW_SECRET_KEY=
WALLET_PRIVATE_KEY=
```

- Generate your `TW_SECRET_KEY` and `NEXT_PUBLIC_TEMPLATE_CLIENT_ID` via thirdweb's [dashboard](https://thirdweb.com/create-api-key).
- For `WALLET_PRIVATE_KEY` export your wallet private key from your wallet.

### Run Locally

Install dependencies:

```bash
yarn
```

Start the server:

```bash
yarn start
```

## Additional Resources

- [Documentation](https://portal.thirdweb.com)
- [Templates](https://thirdweb.com/templates)
- [Video Tutorials](https://youtube.com/thirdweb_)
- [Blog](https://blog.thirdweb.com)

## Contributing

Contributions and [feedback](https://feedback.thirdweb.com) are always welcome!

Please visit our [open source page](https://thirdweb.com/open-source) for more information.

## Need help?

For help, join the [discord](https://discord.gg/thirdweb) or visit our [support page](https://support.thirdweb.com).
