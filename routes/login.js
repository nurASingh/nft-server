/* post users listing. */
router.post('/register', function (req, res, next) {
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
  
  
  router.post('/login', function (req, res, next) {
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