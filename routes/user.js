var express = require('express');
var router = express.Router();

/* post users listing. */
router.post('/user', function (req, res, next) {
    var obj = req.body.user;
    User.findOne({ phone: obj.phone }, function (err, result) {
      if (err) {
        res.send({ passed: false, message: 'Error while creating user' });
      } else {
        if (result) {
          res.send({ passed: false, message: 'User allready exist with phone number ' + obj.phone });
        } else {
          User.create(obj, function (err, result) {
            if (err) {
              res.send({ passed: false, message: err });
            } else {
              res.send({ passed: true, message: 'User created successfull your user id is ' + result.phone });
            }
          });
        }
      }
    });
  });
  
  
  router.post('/user/login', function (req, res, next) {
    var userid = req.body.user.phone, password = req.body.user.password;
    User.findOne({ phone: userid, password: password }, function (err, result) {
      if (err) {
        res.send({ passed: false, message: 'Error while log in' });
      } else {
        if (result) {
          res.send({ passed: true, result: result });
        } else {
          res.send({ passed: false, message: 'Invalid userid and password' });
        }
      }
    });
  });


  router.get('/account/findByStatus',  function (req, res, next) {
    res.send("Find the satus of user Active / Inactive");
  });


  router.get('/user/logout',  function (req, res, next) {
    res.send("Find the satus of user Active / Inactive");
  });


  router.get('/user/{username}',  function (req, res, next) {
    res.send("Find the satus of user Active / Inactive");
  });

  module.exports = router;