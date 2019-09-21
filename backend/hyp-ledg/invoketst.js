"use strict";

const { FileSystemWallet, Gateway } = require("fabric-network");
const path = require("path");

const ccpPath = path.resolve(
  __dirname,
  "..",
  "..",
  "readme.json"
);

async function fetchUsers() {
  try {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    //Check to see if we've already enrolled the user.
    const userExists = await wallet.exists('admin');
    if (!userExists) {
        console.log('An identity for the user "admin" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true }
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("hackathon05");

    // Get the contract from the network.
    const contract = network.getContract("certifier-contract");

    // Submit the specified transaction.
    // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
    // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
    var result = await contract.submitTransaction("fetchUsers");
    console.log("Transaction has been submitted");

    // Disconnect from the gateway.
    await gateway.disconnect();
    return result;
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}

async function createCertifier(id,name) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.exists('admin');
    if (!userExists) {
        console.log('An identity for the user "admin" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork("hackathon05");

    const contract = network.getContract("chaincodes");
    var result = await contract.submitTransaction("createCertifier", id, name);
    console.log("Transaction has been submitted");
    await gateway.disconnect();
    return result;
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}

async function createCertificate(certifierId,certificateId,employeeId,desc) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.exists('admin');
    if (!userExists) {
        console.log('An identity for the user "admin" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork("hackathon05");

    const contract = network.getContract("certifier-contract");
    var result = await contract.submitTransaction("createCertificate", certifierId,certificateId,employeeId,desc);
    console.log("Transaction has been submitted");
    await gateway.disconnect();
    return result;
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}

async function createUser(userId,name) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.exists('admin');
    if (!userExists) {
        console.log('An identity for the user "admin" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork("hackathon05");

    const contract = network.getContract("certifier-contract");
    var result = await contract.submitTransaction("createUser", userId,name);
    console.log("Transaction has been submitted");
    await gateway.disconnect();
    return result;
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}

async function readCertifier(certifierId) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.exists('admin');
    if (!userExists) {
        console.log('An identity for the user "admin" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork("hackathon05");

    const contract = network.getContract("certifier-contract");
    var result = await contract.submitTransaction("readCertifier", certifierId);
    console.log("Transaction has been submitted");
    await gateway.disconnect();
    return result;
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}

async function readCertificate(certificateId) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.exists('admin');
    if (!userExists) {
        console.log('An identity for the user "admin" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork("hackathon05");

    const contract = network.getContract("certifier-contract");
    var result = await contract.submitTransaction("readCertificate", certificateId);
    console.log("Transaction has been submitted");
    await gateway.disconnect();
    return result;
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}

async function updateCertificate(certificateId, ifVerified) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.exists('admin');
    if (!userExists) {
        console.log('An identity for the user "admin" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork("hackathon05");

    const contract = network.getContract("certifier-contract");
    var result = await contract.submitTransaction("updateCertificate", certificateId, ifVerified);
    console.log("Transaction has been submitted");
    await gateway.disconnect();
    return result;
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}

async function addEvent(eventId,eventName, expertise, certifierId) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.exists('admin');
    if (!userExists) {
        console.log('An identity for the user "admin" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork("hackathon05");

    const contract = network.getContract("certifier-contract");
    var result = await contract.submitTransaction("addEvent", eventId,eventName, expertise, certifierId);
    console.log("Transaction has been submitted");
    await gateway.disconnect();
    return result;
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}


async function verifyEvent(userId,eventId) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.exists('admin');
    if (!userExists) {
        console.log('An identity for the user "admin" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork("hackathon05");

    const contract = network.getContract("certifier-contract");
    var result = await contract.submitTransaction("verifyEvent", userId,eventId);
    console.log("Transaction has been submitted");
    await gateway.disconnect();
    return result;
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }

}


async function readEvent(eventId) {
  try {
    const walletPath = path.join(process.cwd(), "wallet");
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const userExists = await wallet.exists('admin');
    if (!userExists) {
        console.log('An identity for the user "admin" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    const gateway = new Gateway();
    await gateway.connect(ccpPath, {
      wallet,
      identity: "admin",
      discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork("hackathon05");

    const contract = network.getContract("certifier-contract");
    var result = await contract.submitTransaction("readEvent",eventId);
    console.log("Transaction has been submitted");
    await gateway.disconnect();
    return result;
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}



module.exports = {fetchUsers,createCertifier,createCertificate,createUser,readCertificate,readCertifier,updateCertificate,addEvent,verifyEvent,readEvent};
