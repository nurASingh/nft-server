var express = require('express');
var router = express.Router();
var fs= require('fs');

var fetch = require('cross-fetch');
const BN = require('bn.js');


async function callContract(){
const { makeContractDeploy,bufferCV,callReadOnlyFunction, broadcastTransaction, AnchorMode } = require('@stacks/transactions');
const { StacksTestnet, StacksMainnet } =require('@stacks/network');
const bufferCVFromString = bufferCV(Buffer.from("foo"));
const contractAddress = 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2';
const contractName = 'hello-world';
const functionName = 'echo-number';
const buffer = bufferCVFromString;
const network = new StacksTestnet();
const senderAddress = 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2';

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


async function deployContract(){
  const { makeContractDeploy, broadcastTransaction, AnchorMode } = require('@stacks/transactions');
  const { StacksTestnet, StacksMainnet } =require('@stacks/network');
  const BigNum = require('bn.js');
  
  // for mainnet, use `StacksMainnet()`
  const network = new StacksTestnet();
  
  const txOptions = {
    contractName: 'contract_name',
    codeBody: fs.readFileSync('../contract/clarity-hello-world/contracts/hello-world.clar').toString(),
    senderKey: 'b244296d5907de9864c0b0d51f98a13c52890be0404e83f273144cd5b9960eed01',
    network,
  };
  
  const transaction = await makeContractDeploy(txOptions);
  
  const broadcastResponse = await broadcastTransaction(transaction, network);


  console.log(broadcastResponse);
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
    // for mainnet, replace `testnet` with `mainnet`
    basePath: 'https://stacks-node-api.testnet.stacks.co',
  });
  
  const key = 'b244296d5907de9864c0b0d51f98a13c52890be0404e83f273144cd5b9960eed01';
  const senderKey = createStacksPrivateKey(key);
  
  const recipient = 'ST28QQXAKCFWG7M956JPCJK0AT9FTSJ2DW27BX7ER';
  
  // amount of Stacks (STX) tokens to send (in micro-STX). 1,000,000 micro-STX are worth 1 Stacks (STX) token
  const amount = new BN(10);
  
  // skip automatic fee estimation
  const fee = new BN(2000);
  
  // skip automatic nonce lookup
  const nonce = new BN(0);
  
  // override default setting to broadcast to the Testnet network
  // for mainnet, use `StacksMainnet()`
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
  
  // get fee
  const feeEstimate = estimateTransfer(transaction);
  
  
  const senderAddress = 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2';
  
  const senderNonce = getNonce(senderAddress);
  // set fee manually
  //transaction.setFee(feeEstimate);
  
  const broadcastResponse = await broadcastTransaction(transaction, network);
  const txID = broadcastResponse.txid;
  
  const serializedTx = transaction.serialize().toString('hex');
  
  const transactions = new TransactionsApi(apiConfig);
  
  /* const txInfo = await transactions.getTransactionById({
    txID,
  });
   */
  console.log(broadcastResponse);
  //return broadcastResponse;
}


/* GET home page. */
router.get('/', function(req, res, next) {
  callContract();
  res.render('index', { title: 'Express' });
});

module.exports = router;

