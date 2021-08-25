var express = require('express');
var router = express.Router();
var NFT = require('../models/nft.js');


router.get('/',  function (req, res, next) {
  import { AppConfig, UserSession } from '@stacks/connect'; 
  res.send("Hello");
});

router.post('/', function (req, res, next) {
  NFT.create(obj, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;