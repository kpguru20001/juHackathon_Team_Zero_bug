"use strict";

const { FileSystemWallet, Gateway } = require("fabric-network");
const path = require("path");

const ccpPath = path.resolve(
  __dirname,
  "..",
  "..",
  "readme.json"
);
console.log(ccpPath)

async function createCertifier(id,name) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.exists('shrey');
    if (!userExists) {
        console.log('An identity for the user "shrey" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    const gateway = new Gateway();
    console.log("connecting");
    await gateway.connect(ccpPath, {
      wallet,
      identity: "shrey",
      discovery: { enabled: true, asLocalhost: false }
    });
    console.log("connected");
    const network = await gateway.getNetwork("hackathon05");

    console.log("got network");
    const contract = network.getContract("chaincodes");

    console.log("got contract");
    var result = await contract.submitTransaction("createCertifier", id, name);
    console.log("Transaction has been submitted");
    await gateway.disconnect();
    return result;
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}

createCertifier();
