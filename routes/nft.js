var express = require('express');
var router = express.Router();
var NFT = require('../models/nft.js');
var fs= require('fs');
var fetch = require('cross-fetch');
const BN = require('bn.js');
var config= require('../config.js')


async function callContract(name,functioname){
	const { bufferCV,callReadOnlyFunction } = require('@stacks/transactions');
	const { StacksTestnet, StacksMainnet } =require('@stacks/network');
	const bufferCVFromString = bufferCV(Buffer.from("foo"));
	const contractAddress = config.senderAddress;
	const contractName = name;
	const functionName = functioname;
	const buffer = bufferCVFromString;
	const network = new StacksTestnet();
	const senderAddress = config.senderAddress;
	const options = {
	  contractAddress,
	  contractName,
	  functionName,
	  functionArgs: [buffer],
	  network,
	  senderAddress,
	};
	const result = await callReadOnlyFunction(options);
	console.log(result);
}

async function deployContract(name,path,next,res){
  const { makeContractDeploy, broadcastTransaction } = require('@stacks/transactions');
  const { StacksTestnet, StacksMainnet } =require('@stacks/network');
  const network = new StacksTestnet();
  const txOptions = {
    contractName: name,
    codeBody: fs.readFileSync(path).toString(),
    senderKey: config.key,
    network,
  };
  const transaction = await makeContractDeploy(txOptions);
  const broadcastResponse = await broadcastTransaction(transaction, network);
  console.log(broadcastResponse);
  res.send(broadcastResponse);
  next();
}

async function makeTransaction(){
  const {
    makeSTXTokenTransfer,
    createStacksPrivateKey,
    broadcastTransaction,
    estimateTransfer,
    getNonce,
    privateKeyToString,
  } = require('@stacks/transactions');
  const { StacksTestnet, StacksMainnet } = require('@stacks/network');
  const { TransactionsApi, Configuration } = require('@stacks/blockchain-api-client');
  const apiConfig = new Configuration({
    fetchApi: fetch,
    basePath: config.basePath,
  });
  
  const key = config.key;
  const senderKey = createStacksPrivateKey(key);
  const recipient = config.recipient;
  const amount = new BN(10);
  const fee = new BN(2000);
  const nonce = new BN(0);
  const network = new StacksTestnet();
  const memo = 'hello world';
  const txOptions = {
    recipient,
    amount,
    fee,
    nonce,
    senderKey: privateKeyToString(senderKey),
    network,
    memo,
  };
  const transaction = await makeSTXTokenTransfer(txOptions);
  const feeEstimate = estimateTransfer(transaction);
  const senderAddress = config.senderAddress;
  const senderNonce = getNonce(senderAddress);
  const broadcastResponse = await broadcastTransaction(transaction, network);
  const txID = broadcastResponse.txid;
  const serializedTx = transaction.serialize().toString('hex');
  const transactions = new TransactionsApi(apiConfig);
  
  const txInfo = await transactions.getTransactionById({
    txID,
  });
  console.log(broadcastResponse);
}


async function mint(name){

} 

router.get('/mynft',  function (req, res, next) {
  
  res.send(NFT);
});

router.get('/mynft/:nftname',  function (req, res, next) {
  res.send(NFT);
});

router.post('/mintnft/:nftname', function (req, res, next) { 
  console.log("nft trait contract deployed");
    deployContract(req.params.nftname,'./contract/clarity-nft/contracts/my-nft.clar',function(){
      console.log(req.params.nftname + " deployed , calling claim")
      callContract(req.params.nftname,'claim');
    },res)
});

module.exports = router;