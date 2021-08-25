var express = require('express');
var router = express.Router();
var NFT = require('../models/nft.js');


router.get('/mynft',  function (req, res, next) {
  res.send("This is the list of all the NFT");
});

router.get('/mynft/{nftname}',  function (req, res, next) {
  res.send("This is the NFT filterded by name");
});

router.post('/mintnft/{nftname}', function (req, res, next) {
  NFT.create(obj, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send("A new NFT minted");
    }
  });
});

module.exports = router;